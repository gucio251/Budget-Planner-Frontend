import PropTypes from 'prop-types';
import {sortTransactionsByChosenProperty, allowNull} from 'Utils/functions';

const SortedTransactions = ({
  children,
  allTransactions = {},
  transactionsPerPage = null,
  indexOfFirstTransaction = null,
}) => {
  if(Object.keys(allTransactions).length === 0) return children({groupedTransactions: []});

  let sortedTransactions = sortTransactionsByChosenProperty(
    allTransactions,
    'date'
  );

  if (transactionsPerPage !== null && indexOfFirstTransaction !== null) {
    sortedTransactions = sortedTransactions.slice(
      indexOfFirstTransaction,
      indexOfFirstTransaction + transactionsPerPage
    );
  }

  const groupedTransactions = groupTransactionsByDate(sortedTransactions);

  return children({
    groupedTransactions,
  });
};

const groupTransactionsByDate = transactions => {
    if(transactions.length === 0) return {};

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
  })),
  children: PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.element,
  PropTypes.node,
]).isRequired,
transactionsPerPage: allowNull(PropTypes.number),
indexOfFirstTransaction: allowNull(PropTypes.number)
};

export default SortedTransactions;