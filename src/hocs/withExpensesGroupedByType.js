import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {graphColors} from 'Utils/svgCorrelation';
import {filterTransactionsByDates, sortTransactionsByChosenProperty} from 'Utils/functions';

const withExpensesGroupedByType = (Component) => props => {
    const expenses = useSelector(state => state.expenses)
    const datesRange = useSelector(state => state.datesRange)
    const [dataToGraph, setDataToGraph] = useState({})
    const [expensesGroupedByType, setExpenesGroupedByType] = useState([]);

    useEffect(()=> {
        if(expenses.loading === false){
            const expensesToBeGrouped = expenses.expenses;
            let filteredExpensesByDate = filterTransactionsByDates(expensesToBeGrouped,datesRange.datesRange)
            let expensesGroupedByType = filteredExpensesByDate.reduce((previousValue, currentValue) => {
                const {Icon, amount, category} = currentValue;
                if(previousValue.hasOwnProperty(category)){
                    const specificValueToBeUpdated = previousValue[category]
                    const increasedAmount = parseFloat(specificValueToBeUpdated.amount) +  parseFloat(currentValue.amount);
                    const increasedOccurences = specificValueToBeUpdated.howManyTimes + 1;
                    return {
                        ...previousValue,
                        [category]: {...specificValueToBeUpdated, amount: parseFloat(increasedAmount).toFixed(2), howManyTimes: increasedOccurences, category: category}
                    }
                }else{
                    return {...previousValue,
                        [category]: {Icon: Icon, amount: parseFloat(amount).toFixed(2), howManyTimes: 1, category: category}
                    }
                }
            }, {});
            
            expensesGroupedByType = sortTransactionsByChosenProperty(expensesGroupedByType, "howManyTimes");

            const slicedExpensesGroupedByType = expensesGroupedByType.slice(-4);

            let dataToGraph = slicedExpensesGroupedByType.reduce((prevValue, {category, howManyTimes}) => {
                return {
                  ...prevValue,
                  labels: [].concat(prevValue.labels, category),
                  backgroundColor: [].concat(prevValue.backgroundColor, graphColors[category].base),
                  hoverBackgroundColor: [].concat(prevValue.hoverBackgroundColor, graphColors[category].hovered),
                  data: [].concat(prevValue.data, howManyTimes)
                };
            }, {labels: [], backgroundColor: [], hoverBackgroundColor: [], data: []})
            console.log(dataToGraph)
            dataToGraph = {
              labels: dataToGraph.labels,
              datasets: [
                {
                  label: 'hehe',
                  backgroundColor: dataToGraph.backgroundColor,
                  hoverBackgroundColor: dataToGraph.hoverBackgroundColor,
                  data: dataToGraph.data,
                },
              ],
            };
            setDataToGraph(dataToGraph);
            setExpenesGroupedByType(expensesGroupedByType);
        }
    },[expenses, datesRange.datesRange])

    return (
        <Component {...props} dataToGraph={dataToGraph} expensesGroupedByType={expensesGroupedByType.slice(-4).reverse()}/>
    );
};

withExpensesGroupedByType.propTypes = {
    
};

export default withExpensesGroupedByType;