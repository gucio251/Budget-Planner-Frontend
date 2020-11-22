import React, {useContext} from 'react';
import {
  Content,
  CloseSignWrapper,
  StyledCloseSign,
  StyledTitle
} from 'components/AddTransactionContent/AddTransactionContent.styled'
import { ModalContext } from 'components/Modal/Modal';
import TransactionAddForm from 'components/TransactionAddForm/TransactionAddForm';
import { incomesActions } from 'redux/actions/incomesActions';
import { expensesActions } from 'redux/actions/expensesActions';
import IncomeTypesContainer from 'containers/IncomeTypesContainer';
import ExpenseTypesContainer from 'containers/ExpenseTypesContainer';
import { getTodaysDate } from 'Utils/functions';
import TabPane from 'components/UI/TabPane';
import Tabs from 'components/Tabs/Tabs';
import { useDispatch } from 'react-redux';
import validate from 'components/validate-yup/validate-yup';
import { validations } from 'components/validationSchemas-yup/validationSchemas-yup';


const initialValues = {
  amount: 0,
  currency: '',
  currency_id: '',
  category: '',
  subcategory: '',
  category_id: '',
  transaction_date: getTodaysDate(),
  comments: '',
};

const AddTransactionContent = () => {
  const Modal = useContext(ModalContext);
  const dispatch = useDispatch();

  const handleIncomeAdd = (income) => {
    dispatch(incomesActions.add(localStorage.getItem('token'), income));
    Modal.handleClose(false);
  };

  const handleExpenseAdd = (expense) => {
    dispatch(expensesActions.add(localStorage.getItem('token'), expense));
    Modal.handleClose();
  };

  return (
    <Content>
      <CloseSignWrapper>
        <StyledCloseSign onClick={Modal.handleClose} />
      </CloseSignWrapper>
      <StyledTitle>NEW TRANSACTION</StyledTitle>
      <Tabs>
        <TabPane tab="1" title="Income">
          <IncomeTypesContainer>
            {({ incomeCategories }) => (
              <TransactionAddForm
                categories={incomeCategories}
                initialValues={Object.assign({}, initialValues, {
                  type: 'income',
                })}
                validate={validate}
                validationSchema={
                  validations.getTransactionAdditionValidationSchema
                }
                handleSubmit={handleIncomeAdd}
              />
            )}
          </IncomeTypesContainer>
        </TabPane>
        <TabPane tab="2" title="Expense">
          <ExpenseTypesContainer>
            {({ expenseCategories }) => (
              <TransactionAddForm
                categories={expenseCategories}
                initialValues={Object.assign({}, initialValues, {
                  type: 'expense',
                })}
                validate={validate}
                validationSchema={
                  validations.getTransactionAdditionValidationSchema
                }
                handleSubmit={handleExpenseAdd}
              />
            )}
          </ExpenseTypesContainer>
        </TabPane>
      </Tabs>
    </Content>
  );
};

export default AddTransactionContent;
