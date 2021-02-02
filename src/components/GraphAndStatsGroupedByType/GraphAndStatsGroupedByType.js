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
import Dropdown from 'components/UI/Dropdown';

const StyledDropdowns = styled.div`
  display: flex;
  & > *{
    width: 130px;
  }
`;

const Row = styled.div`
  display: flex;
  width: 65%;

  ${({theme}) => theme.devices.mobile}{
    flex-direction: column;
    width: 100%;

  }
`;

const StyledTextArea = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 0.5em;
`

const StyledMainText = styled.h3`

`

const Text = styled.p`

`

const GraphAndStatsGroupedByType = (props) => {
  const [dataToBeDisplayed, setDataToBeDisplayed] = useState({
    category: 'expenses',
    type: 'popular',
  });

  const handleDataChange = ({value, dataType}) => {
    setDataToBeDisplayed({
      ...dataToBeDisplayed,
      [dataType]: value,
    });
  };

  return (
    <>
      {renderGraphArea({ handleDataChange, dataToBeDisplayed, Transactions: prepareTransactions(props)})}
    </>
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
        <Dropdown
          name="category"
          list={[
            { value: 'incomes', label: 'incomes', dataType: 'category' },
            { value: 'expenses', label: 'expenses', dataType: 'category' },
          ]}
          onChange={handleDataChange}
          value={dataToBeDisplayed.category.label}
          indexOfDefaultValue={0}
        />
        <Dropdown
          name="type"
          list={[
            { value: 'popular', label: 'popular', dataType: 'type' },
            { value: 'expensive', label: 'expensive', dataType: 'type' },
          ]}
          onChange={handleDataChange}
          value={dataToBeDisplayed.type.label}
          indexOfDefaultValue={0}
        />
      </StyledDropdowns>
      {Transactions[dataToBeDisplayed.category][dataToBeDisplayed.type].data
        .length === 0 ? (
        <StyledTextArea>
          <StyledMainText>
            {`No ${dataToBeDisplayed.category} to analyze yet`}
          </StyledMainText>
          <Text>{`Add ${dataToBeDisplayed.category} and start analysing your spendings`}</Text>
        </StyledTextArea>
      ) : (
        <>
          <Row>
            <Doughnut
              data={
                Transactions[dataToBeDisplayed.category][dataToBeDisplayed.type]
                  .graph
              }
              options={options}
            />
            <GroupedTransactionsDisplayer
              transactions={
                Transactions[dataToBeDisplayed.category][dataToBeDisplayed.type]
                  .data
              }
            />
          </Row>
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