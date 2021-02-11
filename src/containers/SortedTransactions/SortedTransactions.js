import React from 'react';
import PropTypes from 'prop-types';
import {sortTransactionsByChosenProperty} from 'Utils/functions';

const SortedTransactions = ({children, allTransactions}) => {
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
  allTransactions: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    category_id: PropTypes.number,
    category: PropTypes.string,
    comments: PropTypes.string,
    currency: PropTypes.string,
    currenncy_id: PropTypes.number,
    id: PropTypes.number,
    subcategory: PropTypes.string,
    transaction_date: PropTypes.string,
    type: PropTypes.string
  }))
};

export default SortedTransactions;