import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  groupTransactionsByCategory,
  filterTransactionsByDates,
  sortTransactionsByChosenProperty,
  prepareDataForGraph,
} from 'Utils/functions';
import { Pie, Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import GroupedTransactionsDisplayer from 'components/GroupedTransactionsDisplayer/GroupedTransactionsDisplayer'
import { graphColors } from 'Utils/svgCorrelation';
import Select, { components } from 'react-select';

const GraphArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const DropdownsWrapper = styled.div`
  width: 100%;
  display: flex;
`

const SingleDDWrapper = styled.div`
  width: 50%;
`

const DisplayArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
`

const GraphWrapper = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  align-items: center;
`

const DisplayWrapper = styled.div`
  width: 50%;
`

const optionsx = [
  {value: "expenses", label: "expenses"},
  {value: "incomes", label: "incomes"}
]

const optionsy = [
  {value: "popular", label: "popular"},
  {value: "expensive", label: "expensive"}
]
const GraphAndStatsGroupedByType = ({Transactions}) => {
  const [selectedVariant, setSelectedVariant] = useState({category: "expenses", type: "popular"})
  const options = {
    legend: {
      display: false
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
      <GraphArea>
        <DropdownsWrapper>
          <SingleDDWrapper>
            <Select
              options={optionsx}
              value={selectedVariant.category}
              name="category"
              onChange={(option) =>
                setSelectedVariant((prevState) => {
                  return {
                    ...prevState,
                    category: option.label,
                  };
                })
              }
            />
          </SingleDDWrapper>
          <SingleDDWrapper>
            <Select
              options={optionsy}
              value={selectedVariant.type}
              name="type"
              onChange={(option) =>
                setSelectedVariant((prevState) => {
                  return {
                    ...prevState,
                    type: option.label,
                  };
                })
              }
            />
          </SingleDDWrapper>
        </DropdownsWrapper>
        <DisplayArea>
          <GraphWrapper>
            <Doughnut
              data={
                Transactions[selectedVariant.category][selectedVariant.type]
                  .graph
              }
              options={options}
            />
          </GraphWrapper>
          <DisplayWrapper>
            <GroupedTransactionsDisplayer
              expensesGroupedByType={
                Transactions[selectedVariant.category][selectedVariant.type]
                  .data
              }
            />
          </DisplayWrapper>
        </DisplayArea>
      </GraphArea>
    </>
  );
};

GraphAndStatsGroupedByType.propTypes = {
    
};

const getTransactions = createSelector(
  (state) => state.expenses.expenses,
  (state) => state.incomes.incomes,
  (state) => state.datesRange.datesRange,
  (expenses, incomes, datesRange) => {
    const filteredExpenses = filterTransactionsByDates(expenses, datesRange);
    const filteredIncomes = filterTransactionsByDates(incomes, datesRange);

    const groupedExpenses = groupTransactionsByCategory(filteredExpenses);
    const groupedIncomes = groupTransactionsByCategory(filteredIncomes);

    const sortedExpensesByPopularity = sortTransactionsByChosenProperty(groupedExpenses, 'howManyTimes');
    const sortedIncomesByPopularity = sortTransactionsByChosenProperty(groupedIncomes, 'howManyTimes');

    const sortedExpensesByHighestAmount = sortTransactionsByChosenProperty(groupedExpenses, 'amount');
    const sortedIncomesByHighestAmount = sortTransactionsByChosenProperty(groupedIncomes, 'amount');

    const graphDataExpensesByPopularity = prepareDataForGraph(sortedExpensesByPopularity, graphColors, 'howManyOccurences');
    const graphDataIncomesByPopularity = prepareDataForGraph(sortedIncomesByPopularity, graphColors, 'howManyOccurences');

    const graphDataExpensesByAmount= prepareDataForGraph(sortedExpensesByHighestAmount, graphColors, 'amount');
    const graphDataIncomesByAmount = prepareDataForGraph(sortedIncomesByHighestAmount, graphColors, 'amount');

    return {
      expenses: {
        popular: {
          graph: graphDataExpensesByPopularity,
          data: sortedExpensesByPopularity,
        },
        expensive: {
          graph: graphDataExpensesByAmount,
          data: sortedExpensesByHighestAmount,
        },
      },
      incomes: {
        popular: {
          graph: graphDataIncomesByPopularity,
          data: sortedIncomesByPopularity,
        },
        expensive: {
          graph: graphDataIncomesByAmount,
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