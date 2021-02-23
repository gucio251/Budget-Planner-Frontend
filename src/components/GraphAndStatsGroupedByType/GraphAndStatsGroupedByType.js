import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  sortTransactionsByChosenProperty,
  prepareDataForGraph,
} from 'Utils/functions';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import GroupedTransactionsDisplayer from 'components/GroupedTransactionsDisplayer/GroupedTransactionsDisplayer'
import { graphColors } from 'Utils/svgCorrelation';
import Dropdown from 'components/UI/Dropdown';
import { connect } from 'react-redux';
import { getCategoryNameBySubcategoryId, getIconBySubcategoryId } from 'redux/reducers/expenseTypesReducer'

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
    category: 'incomes',
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
          value={{label: dataToBeDisplayed.category}}
        />
        <Dropdown
          name="type"
          list={[
            { value: 'popular', label: 'popular', dataType: 'type' },
            { value: 'expensive', label: 'expensive', dataType: 'type' },
          ]}
          onChange={handleDataChange}
          value={{label: dataToBeDisplayed.type}}
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

const convertIdsToNames = (transactions, transactionTypes) => {
  if(transactions.length === 0) return [];

  return transactions.map(transaction => {
    const categoryName = getCategoryNameBySubcategoryId(
      parseInt(transaction.transaction_type_id),
      transactionTypes
    );

    const Icon = getIconBySubcategoryId(
      parseInt(transaction.transaction_type_id),
      transactionTypes
    );

    return {
      ...transaction,
      categoryName,
      Icon
    }
  });

}

const prepareTransactions = props => {
  const expensesWithNames = convertIdsToNames(
    props.expenses,
    props.expenseTypes
  );

  const incomesWithNames = convertIdsToNames(
    props.incomes,
    props.incomeTypes
  );

  const groupedExpenses = countOccurrencesAndTotalAmount(
    expensesWithNames,
    'categoryName'
  );
  const groupedIncomes = countOccurrencesAndTotalAmount(
    incomesWithNames,
    'categoryName'
  );

  const sortedExpensesByPopularity = sortTransactionsByChosenProperty(
    groupedExpenses,
    'occurrences'
  );
  const sortedIncomesByPopularity = sortTransactionsByChosenProperty(
    groupedIncomes,
    'occurrences'
  );

  const sortedExpensesByHighestAmount = sortTransactionsByChosenProperty(
    groupedExpenses,
    'totalAmount'
  );
  const sortedIncomesByHighestAmount = sortTransactionsByChosenProperty(
    groupedIncomes,
    'totalAmount'
  );

  return {
    expenses: {
      popular: {
        graph: prepareDataForGraph(
          sortedExpensesByPopularity.slice(0, 4),
          graphColors,
          'occurrences'
        ),
        data: sortedExpensesByPopularity.slice(0, 4),
      },
      expensive: {
        graph: prepareDataForGraph(
          sortedExpensesByHighestAmount.slice(0,4),
          graphColors,
          'totalAmount'
        ),
        data: sortedExpensesByHighestAmount.slice(0,4),
      },
    },
    incomes: {
      popular: {
        graph: prepareDataForGraph(
          sortedIncomesByPopularity.slice(0, 4),
          graphColors,
          'occurrences'
        ),
        data: sortedIncomesByPopularity.slice(0.4),
      },
      expensive: {
        graph: prepareDataForGraph(
          sortedIncomesByHighestAmount.slice(0, 4),
          graphColors,
          'totalAmount'
        ),
        data: sortedIncomesByHighestAmount.slice(0, 4),
      },
    },
  };
}

const countOccurrencesAndTotalAmount = (transactions, collectorName) => {
  let finalResult = {};
  if(transactions.length === 0) return finalResult;
  transactions.forEach((transaction) => {
    const {amount, Icon} = transaction;
    const idAlreadyAdded = finalResult[transaction[collectorName]]
      ? true
      : false;

    finalResult[transaction[collectorName]] = {
      totalAmount:
        idAlreadyAdded === false
          ? amount
          : finalResult[transaction[collectorName]].totalAmount + amount,
      occurrences:
        idAlreadyAdded === false
          ? 1
          : finalResult[transaction[collectorName]].occurrences + 1,
      Icon
    };
  });

  return finalResult;
}

GraphAndStatsGroupedByType.propTypes = {
  incomes: PropTypes.array,
  expenses: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    incomeTypes: state.incomeTypes.incomeTypes,
    expenseTypes: state.expenseTypes.expenseTypes
  }
}

export default connect(mapStateToProps)(GraphAndStatsGroupedByType);