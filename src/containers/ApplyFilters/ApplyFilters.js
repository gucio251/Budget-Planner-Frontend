import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const ApplyFilters = ({children, transactions}) => {
    const filters = useSelector(state => state.filtration)
    const incomeTypes = useSelector(state => state.incomeTypes.incomeTypes);
    const expenseTypes = useSelector(state => state.expenseTypes.expenseTypes);

    return children({
        filteredTransactions: filter(transactions, filters, incomeTypes, expenseTypes)
    })
};


const filter = (transactions, filters, incomeTypes, expenseTypes) => {
    let filteredTransactions = transactions;

    if (filters.type !== 'all') {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.type === filters.type
      );
    }

    if (filters.categories.length !== 0) {
      const filtrationCategories = filters.categories.reduce(
        (acc, { type, value }) => {
          const key = `${type}/${value}`;
          return {
            ...acc,
            [key]: value,
          };
        },
        {}
      );

      filteredTransactions = filteredTransactions.filter((transaction) => {
        const { type, transaction_type_id } = transaction;
        const transactionType = type === 'income' ? incomeTypes : expenseTypes;
        const category_id = getCategoryIdBySubcategoryId(
          transaction_type_id,
          transactionType
        );

        const uniqueId = `${type}Types/${category_id}`;
        if (filtrationCategories[uniqueId]) return transaction;
      });
    }

    if (filters.subcategories.length !== 0) {
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const result = filters.subcategories.filter((subcategory) => {
          if (subcategory.type === transaction.type) {
            if (subcategory.value === transaction.transaction_type_id) {
              return subcategory;
            }
          }
        });

        if (result.length !== 0) return result[0];
      });
    }

    if (filters.amountFrom !== null) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.amount >= filters.amountFrom
      );
    }

    if (filters.amountTo !== null) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.amount < filters.amountTo
      );
    }

    if (filters.comment !== ''){
        filteredTransactions = filteredTransactions.filter((transaction) =>
          transaction.comments.includes(filters.comment)
        );
    }

    return filteredTransactions;
}

const getCategoryIdBySubcategoryId = (id, transactionType) => {
    return transactionType.subcategories[id].category_id;
}
ApplyFilters.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      transaction_type_id: PropTypes.number,
      currency_id: PropTypes.number,
      amount: PropTypes.number,
      comments: PropTypes.string,
      currency: PropTypes.string,
      date: PropTypes.string,
      type: PropTypes.string
  }))
};

export default ApplyFilters;