import React from 'react';
import PropTypes from 'prop-types';
import {sortTransactionsByChosenProperty} from 'Utils/functions';

const SortedTransactions = ({children, allTransactions}) => {
    const sortedTransactions = sortTransactionsByChosenProperty(allTransactions, 'date');

    const groupedTransactions = groupTransactionsByDate(sortedTransactions);

    return children({
      groupedTransactions,
    });
};

const groupTransactionsByDate = transactions => {
    return transactions.reduce((groupedData, currentTransaction, index) => {
        if(index === 0 || !groupedData.hasOwnProperty(currentTransaction.date)){
            return {
                ...groupedData,
                [currentTransaction.date]: [currentTransaction]
            }
        }else{
            return {
              ...groupedData,
              [currentTransaction.date]: [].concat(
                groupedData[currentTransaction.date],
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