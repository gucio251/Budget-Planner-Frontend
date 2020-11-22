import React from 'react';
import ModifyTransactionTemplate from 'components/ModifyTransactionTemplate/ModifyTransactionTemplate';
import TransactionModifyFormContainer from 'containers/TransactionModifyFormContainer';
import withFormik from 'hocs/withFormikValidation';

const TransactionModifyForm = ({
  errors,
  values,
  handleChange,
  handleSubmit,
  setFieldValue,
  handleBlur,
  touched,
  categories,
}) => {
    debugger;
  return (
    <TransactionModifyFormContainer
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
    </TransactionModifyFormContainer>
  );
};

export default withFormik(TransactionModifyForm);
