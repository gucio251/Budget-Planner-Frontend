import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ExpenseTypesContainer = ({ children }) => {
  const [expenseCategories, setExpenseCategories] = useState([]);
  const expenseTypesState = useSelector((state) => state.expenseTypes);

  useEffect(() => {
    if (expenseTypesState.loading === false) {
      setExpenseCategories(expenseTypesState.expenseTypes);
    }
  }, [expenseTypesState]);

  return children({
    expenseCategories,
  });
};

ExpenseTypesContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ExpenseTypesContainer;
