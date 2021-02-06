import React from 'react';
import PropTypes from 'prop-types';
import {sortTransactionsByChosenProperty} from 'Utils/functions';

const SortedTransactions = ({children, expenses, incomes}) => {
    const allTransactions = [].concat(expenses, incomes);

    const sortedTransactions = sortTransactionsByChosenProperty(allTransactions, 'transaction_date');

    const groupedTransactions = groupTransactionsByDate(sortedTransactions);

    return children({
      groupedTransactions,
    });
};

const groupTransactionsByDate = transactions => {
    return transactions.reduce((groupedData, currentTransaction, index) => {
        if(index === 0 || !groupedData.hasOwnProperty(currentTransaction.transaction_date)){
            return {
                ...groupedData,
                [currentTransaction.transaction_date]: [currentTransaction]
            }
        }else{
            return {
              ...groupedData,
              [currentTransaction.transaction_date]: [].concat(
                groupedData[currentTransaction.transaction_date],
                currentTransaction
              ),
            };
        }
    }, {});
}

SortedTransactions.propTypes = {
    
};

export default SortedTransactions;