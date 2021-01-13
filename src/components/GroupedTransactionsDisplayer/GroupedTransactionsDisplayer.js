import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const List = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  padding-right: 3%;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 3% 1% 3% 1%;

  & > *:first-child{
    margin-right: 5%;
  }
`

const GroupedTransactionsDisplayer = ({transactions}) => {
  return (
    <Wrapper>
      <List>
        {transactions.map(({ Icon, name }, index) => (
          <ListItem key={index}>
            <Icon />
            {name}
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
};

GroupedTransactionsDisplayer.propTypes = {
  transactions: PropTypes.object
};

export default GroupedTransactionsDisplayer;