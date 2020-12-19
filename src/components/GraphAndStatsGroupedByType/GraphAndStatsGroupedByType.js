import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
      {renderGraphArea({ handleDataChange, dataToBeDisplayed, Transactions: prepareTransactions(props)})}
    </StyledGraphArea>
  );
};

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
            return Object.keys(ctx.dataset._meta).map(key => {
              const sum = ctx.dataset._meta[key].total;
              const percentage =((value * 100) / sum).toFixed(0) + '%';
              return percentage;
            })
          },
          color: '#fff',
        }
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

  );
}

const prepareTransactions = props => {
    const transactions = [].concat(props.incomes, props.expenses);
    const groupedTransactions = groupTransactionsByCategory(transactions);

    const sortedExpensesByPopularity = sortTransactionsByChosenProperty(groupedTransactions.expenses, 'howManyTimes');
    const sortedIncomesByPopularity = sortTransactionsByChosenProperty(groupedTransactions.incomes, 'howManyTimes');

    const sortedExpensesByHighestAmount = sortTransactionsByChosenProperty(groupedTransactions.expenses, 'amount');
    const sortedIncomesByHighestAmount = sortTransactionsByChosenProperty(groupedTransactions.incomes, 'amount');

    return {
      expenses: {
        popular: {
          graph: prepareDataForGraph(sortedExpensesByPopularity.slice(0,4), graphColors, 'howManyOccurences'),
          data: sortedExpensesByPopularity.slice(0,4),
        },
        expensive: {
          graph: prepareDataForGraph(sortedExpensesByHighestAmount.slice(0,4), graphColors, 'amount'),
          data: sortedExpensesByHighestAmount.slice(0,4),
        },
      },
      incomes: {
        popular: {
          graph: prepareDataForGraph(sortedIncomesByPopularity.slice(0,4), graphColors, 'howManyOccurences'),
          data: sortedIncomesByPopularity.slice(0.4),
        },
        expensive: {
          graph: prepareDataForGraph(sortedIncomesByHighestAmount.slice(0,4), graphColors, 'amount'),
          data: sortedIncomesByHighestAmount.slice(0,4),
        },
      },
    };
}

GraphAndStatsGroupedByType.propTypes = {
    
};


export default GraphAndStatsGroupedByType;