import React, {useContext} from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { ModalContext } from 'components/Modal/Modal'
import TransactionAddFormContainer from 'Containers/TransactionAddFormContainer'
import { expensesActions } from 'redux/actions/expensesActions';
import { getTodaysDate } from 'Utils/functions';
import validate from 'components/validate-yup/validate-yup';
import { validations } from 'components/validationSchemas-yup/validationSchemas-yup';

import ModifyTransactionTemplate from 'components/ModifyTransactionTemplate/ModifyTransactionTemplate';

const initialValues = {
  amount: 0,
  currency: '',
  currency_id: '',
  category: '',
  subcategory: '',
  category_id: '',
  transaction_date: getTodaysDate(),
  comments: '',
  type:'expense'
}

const ExpenseFormWithValidation = () => {
  const dispatch = useDispatch();
  const Modal = useContext(ModalContext);

  const handleExpenseAdd = (expense) => {
    dispatch(expensesActions.add(localStorage.getItem('token'), expense));
    Modal.setShow(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate(validations.getTransactionAdditionValidationSchema)}
      validationSchemaOptions={{ showMultipleFieldErrors: true }}
      enableReinitialize={true}
      onSubmit={handleExpenseAdd}
      render={(formikProps) => (
        <ExpenseAddForm
          {...formikProps}
        />
      )}
    />
  );
};

const ExpenseAddForm = ({
  errors,
  values,
  handleChange,
  handleSubmit,
  setFieldValue,
  handleBlur,
  touched
}) => {
  const expenseCategories = useSelector((state) => state.expenseTypes.expenseTypes);
  return (
    <TransactionAddFormContainer
      values={values}
      touched={touched}
      errors={errors}
      categories={expenseCategories}
    >
      {({
        categories,
        subcategories,
        formCorrectness,
        subcategoryDisabled,
        currencies,
      }) => (
        <ModifyTransactionTemplate
          categories={categories}
          subcategories={subcategories}
          formCorrectness={formCorrectness}
          subcategoryDisabled={subcategoryDisabled}
          currencies={currencies}
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setFieldValue={setFieldValue}
          handleBlur={handleBlur}
        />
      )}
    </TransactionAddFormContainer>
  );
};

export default ExpenseFormWithValidation;