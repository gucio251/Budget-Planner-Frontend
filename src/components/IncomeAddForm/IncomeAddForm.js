import React, {useContext} from 'react';
import { Formik } from 'formik'
import {getTodaysDate} from 'Utils/functions'
import { ModalContext } from 'components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { incomesActions } from 'redux/actions/incomesActions';
import TransactionAddFormContainer from 'Containers/TransactionAddFormContainer';
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
  type: 'income'
};

const IncomeFormWithValidation = () => {
  const dispatch = useDispatch();
  const Modal = useContext(ModalContext);

  const handleIncomeAdd = (income) => {
    dispatch(incomesActions.add(localStorage.getItem('token'), income));
    Modal.handleClose(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate(validations.getTransactionAdditionValidationSchema)}
      validationSchemaOptions={{ showMultipleFieldErrors: true }}
      onSubmit={handleIncomeAdd}
      enableReinitialize={true}
      render={(formikProps) => <IncomeAddForm {...formikProps} />}
    />
  );
};

const IncomeAddForm = ({
  handleSubmit,
  errors,
  values,
  handleChange,
  setFieldValue,
  handleBlur,
  touched,
}) => {
   const incomeCategories = useSelector((state) => state.incomeTypes.incomeTypes);
  return (
    <TransactionAddFormContainer
      touched={touched}
      errors={errors}
      values={values}
      categories={incomeCategories}
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

export default IncomeFormWithValidation;