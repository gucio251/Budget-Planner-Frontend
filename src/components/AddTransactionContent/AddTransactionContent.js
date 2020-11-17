import React, {useContext} from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseSign } from 'assets/icons/closeSign.svg';
import { ModalContext } from 'components/Modal/Modal';
import ExpenseAddForm from 'components/ExpenseAddForm/ExpenseAddForm';
import IncomeAddForm from 'components/IncomeAddForm/IncomeAddForm';
import TabPane from 'components/UI/TabPane';
import Tabs from 'components/Tabs/Tabs';

const Content = styled.div`
  position: absolute;
  left: 33%;
  width: 33%;
  margin-top: 5%;
  display: flex;
  z-index: 3;
  flex-direction: column;
  align-items: center;
  max-height: 100%;
  background-color: #f8f9fb;
  transition: max-height 2s ease-in;
`;

const StyledCloseSign = styled(CloseSign)`
  &:hover{
    transform: scale(1.3);
  }
`

const CloseSignWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 20px 20px 0 0;
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
  const Modal = useContext(ModalContext);
  return (
    <Content>
      <CloseSignWrapper>
        <StyledCloseSign onClick={Modal.handleClose}/>
      </CloseSignWrapper>
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
