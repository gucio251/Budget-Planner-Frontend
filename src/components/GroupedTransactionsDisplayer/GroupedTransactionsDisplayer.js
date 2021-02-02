import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;

  ${({ theme }) => theme.devices.mobile} {
    padding-top: 1em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 1em;
  padding: 0.3em 0.1em;

  & > *:first-child {
    margin-right: 2%;
  }
`;

const GroupedTransactionsDisplayer = ({transactions}) => {
  return (
      <List>
        {transactions.map(({ Icon, name }, index) => (
          <ListItem key={index}>
            <Icon />
            {name}
          </ListItem>
        ))}
      </List>
  );
};

GroupedTransactionsDisplayer.propTypes = {
  transactions: PropTypes.object
};

export default GroupedTransactionsDisplayer;