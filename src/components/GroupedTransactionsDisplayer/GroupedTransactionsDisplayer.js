import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TransactionsList = styled.ul`
  list-style: none;

  & > li:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const TransactionsListItem = styled.li`
  font-size: 16;
  font-weight: normal;
  display: flex;
  align-items: center;
`

const TransactionCategoryName = styled.span`
  margin-left: 10px;
`
const GroupedTransactionsDisplayer = ({expensesGroupedByType}) => {
  return (
      <TransactionsList>
        {expensesGroupedByType.map(({Icon, name}, index)=> (
          <TransactionsListItem
            key={index}
          >
            <Icon />
            <TransactionCategoryName>
              {name}
            </TransactionCategoryName>
          </TransactionsListItem>
        ))}
      </TransactionsList>
    );
};

GroupedTransactionsDisplayer.propTypes = {
    
};

export default GroupedTransactionsDisplayer;