import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  groupTransactionsByCategory,
  sortTransactionsByChosenProperty,
  prepareDataForGraph,
} from 'Utils/functions';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import GroupedTransactionsDisplayer from 'components/GroupedTransactionsDisplayer/GroupedTransactionsDisplayer'
import { graphColors } from 'Utils/svgCorrelation';
import CustomDropdownDashboard from 'components/UI/CustomDropdownDashboard'

const StyledGraphArea = styled.section`
  display: grid;
  height: 100%;
  grid-template-columns: 7fr 5fr;
  grid-template-rows: 1fr 6fr;
  grid-template-areas:
  'dropdowns .'
  'graph list';
`
const StyledDropdowns = styled.div`
  grid-area: dropdowns;
`;

const StyledGraph = styled.div`
  grid-area: graph;
`;

const StyledList = styled.div`
  grid-area: list;
`;

const GraphAndStatsGroupedByType = (props) => {
  const [dataToBeDisplayed, setDataToBeDisplayed] = useState({
    category: 'expenses',
    type: 'popular',
  });

  const handleDataChange = ({ target }) => {
    setDataToBeDisplayed({
      ...dataToBeDisplayed,
      [target.name]: target.value,
    });
  };

  return (
    <StyledGraphArea>
      {props.status === 'loading'
        ? renderLoader()
        : renderGraphArea({ ...props, handleDataChange, dataToBeDisplayed })}
    </StyledGraphArea>
  );
};

const renderLoader = () => {
  return (
    <div>
      Loading xd
    </div>
  )
}

const renderGraphArea = props => {
  const {dataToBeDisplayed, handleDataChange, Transactions} = props;

  const options = {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const sum = ctx.dataset._meta[0].total;
          const percentage = ((value * 100) / sum).toFixed(0) + '%';
          return percentage;
        },
        color: '#fff',
      },
    },
  };
  return (
    <>
        <StyledDropdowns>
          <CustomDropdownDashboard
            name="category"
            list={['incomes', 'expenses']}
            handleChange={handleDataChange}
            value={dataToBeDisplayed.category}
          />
          <CustomDropdownDashboard
            name="type"
            list={['popular', 'expensive']}
            handleChange={handleDataChange}
            value={dataToBeDisplayed.type}
          />
        </StyledDropdowns>
        {Transactions.status !== 'loading' && (
          <>
            <StyledGraph>
              <Doughnut
                data={
                  Transactions[dataToBeDisplayed.category][
                    dataToBeDisplayed.type
                  ].graph
                }
                options={options}
              />
            </StyledGraph>
            <StyledList>
              <GroupedTransactionsDisplayer
                transactions={
                  Transactions[dataToBeDisplayed.category][
                    dataToBeDisplayed.type
                  ].data
                }
              />
            </StyledList>
          </>
        )}
    </>
  );
}


GraphAndStatsGroupedByType.propTypes = {
    
};

const getTransactions = createSelector(
  (state) => state.filteredTransactions,
  (transactionsState) => {
    const { status, transactions } = transactionsState;
    if(status === 'idle'){
      return {
        status: "loading"
      }
    }

    const groupedTransactions = groupTransactionsByCategory(transactions);

    const sortedExpensesByPopularity = sortTransactionsByChosenProperty(groupedTransactions.expenses, 'howManyTimes');
    const sortedIncomesByPopularity = sortTransactionsByChosenProperty(groupedTransactions.incomes, 'howManyTimes');

    const sortedExpensesByHighestAmount = sortTransactionsByChosenProperty(groupedTransactions.expenses, 'amount');
    const sortedIncomesByHighestAmount = sortTransactionsByChosenProperty(groupedTransactions.incomes, 'amount');

    return {
      expenses: {
        popular: {
          graph: prepareDataForGraph(sortedExpensesByPopularity, graphColors, 'howManyOccurences'),
          data: sortedExpensesByPopularity,
        },
        expensive: {
          graph: prepareDataForGraph(sortedExpensesByHighestAmount, graphColors, 'howManyOccurences'),
          data: sortedExpensesByHighestAmount,
        },
      },
      incomes: {
        popular: {
          graph: prepareDataForGraph(sortedIncomesByPopularity, graphColors, 'howManyOccurences'),
          data: sortedIncomesByPopularity,
        },
        expensive: {
          graph: prepareDataForGraph(sortedIncomesByHighestAmount, graphColors, 'howManyOccurences'),
          data: sortedIncomesByHighestAmount,
        },
      },
    };
  }
);

const mapState = (state) => {
  return {
    Transactions: getTransactions(state),
  };
};

export default connect(mapState)(GraphAndStatsGroupedByType);