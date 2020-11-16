import React from 'react';
import styled from 'styled-components';
import ExpenseAddForm from 'components/ExpenseAddForm/ExpenseAddForm';
import IncomeAddForm from 'components/IncomeAddForm/IncomeAddForm';
import TabPane from 'components/UI/TabPane';
import Tabs from 'components/Tabs/Tabs';

const Content = styled.div`
  display: flex;
  z-index: 3;
  flex-direction: column;
  align-items: center;
  max-height: 100%;
  background-color: #f8f9fb;
  transition: max-height 2s ease-in;
`;

const StyledTitle = styled.p`
  color: ${({ theme }) => theme.mainBlue};
  font-size: 20px;
  margin-top: 46px;
  width: 60%;
  display: flex;
  justify-content: flex-start;
`;

const AddTransactionContent = () => {
  return (
      <Content>
        <StyledTitle>NEW TRANSACTION</StyledTitle>
        <Tabs>
          <TabPane tab="1" title="Income">
            <IncomeAddForm />
          </TabPane>
          <TabPane tab="2" title="Expense">
            <ExpenseAddForm />
          </TabPane>
        </Tabs>
      </Content>
  );
};

export default AddTransactionContent;
