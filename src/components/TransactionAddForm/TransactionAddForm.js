import React from 'react';
import ModifyTransactionTemplate from 'components/ModifyTransactionTemplate/ModifyTransactionTemplate';
import TransactionAddFormContainer from 'containers/TransactionAddFormContainer'
import withFormik from 'hocs/withFormikValidation';

const TransactionAddForm = ({
  errors,
  values,
  handleChange,
  handleSubmit,
  setFieldValue,
  handleBlur,
  touched,
  categories
}) => {
  return (
    <TransactionAddFormContainer
      values={values}
      touched={touched}
      errors={errors}
      categories={categories}
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

export default withFormik(TransactionAddForm);