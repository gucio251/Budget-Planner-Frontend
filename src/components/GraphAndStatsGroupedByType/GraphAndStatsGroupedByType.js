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

const StyledGraphArea = styled.div`
  display: grid;
  height: calc(100% - 75px);
  grid-template-columns: 60% 40%;
  grid-template-rows: 15% 85%;
  grid-template-areas:
  'dropdowns .'
  'graph list';
`
const StyledDropdowns = styled.div`
  grid-area: dropdowns;
`;

const StyledGraph = styled.div`
  grid-area: graph;
  display: flex;
  align-items: center;
`;

const StyledList = styled.div`
  grid-area: list;
`;

const StyledTextArea = styled.div`
  grid-area: graph / graph / graph / list;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledMainText = styled.h3`
  font-size: 21px;
  font-weight: 450;
`

const Text = styled.p`
  font-size: 14px;
`

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
          color: 'black',
          backgroundColor: 'white',
          opacity: 0.8
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
      {Transactions[dataToBeDisplayed.category][dataToBeDisplayed.type].data.length === 0 ? (
        <StyledTextArea>
          <StyledMainText>
            {`No ${dataToBeDisplayed.category} to analyze yet`}
          </StyledMainText>
          <Text>{`Add ${dataToBeDisplayed.category} and start analysing your spendings`}</Text>
        </StyledTextArea>
      ) : (
        <>
          <StyledGraph>
            <Doughnut
              data={
                Transactions[dataToBeDisplayed.category][dataToBeDisplayed.type]
                  .graph
              }
              options={options}
            />
          </StyledGraph>
          <StyledList>
            <GroupedTransactionsDisplayer
              transactions={
                Transactions[dataToBeDisplayed.category][dataToBeDisplayed.type]
                  .data
              }
            />
          </StyledList>
        </>
      )}
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
  incomes: PropTypes.array,
  expenses: PropTypes.array,
};


export default GraphAndStatsGroupedByType;