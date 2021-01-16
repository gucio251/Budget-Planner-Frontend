import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { incomesActions } from 'redux/actions/incomesActions';
import { expensesActions } from 'redux/actions/expensesActions';
import { validations } from 'components/validationSchemas-yup/validationSchemas-yup';

import Button from 'components/UI/Button';
import DatePicker from 'components/UI/DatePicker';
import Dropdown from 'components/UI/Dropdown';
import InputWithBorder from 'components/UI/InputWithBorder';
import LabelWrapper from 'components/UI/LabelWrapper';
import { ReactComponent as CloseFormSign } from 'assets/icons/closeSign.svg';
import TextArea from 'components/UI/TextArea';
import TabPane from 'components/UI/TabPane';
import Tabs from 'components/Tabs/Tabs';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 600px;
  background-color: #f8f9fb;
  padding: 3%;
`;

const StyledCloseFormSign = styled(CloseFormSign)`
  position: absolute;
  right: 4%;
  top: 4%;

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;

`
const TransactionHandlingForm = props => {
    const dispatch = useDispatch();
    const [categoriesToBeDisplayed, setCategoriesToBeDisplayed] = useState(setupCategoriesToBeDisplayed(props.initialValues));
    const [initialValues, setInitialValues] = useState(props.initialValues);

    const handleSourceChange = (name) => {
      switch(name){
        case 'Income':
          setCategoriesToBeDisplayed('incomeTypes');
          setInitialValues((prevState) => ({
            ...prevState,
            type: 'income',
          }));
          break;
        case 'Expense':
          setInitialValues((prevState) => ({
            ...prevState,
            type: 'expense'
          }))
          setCategoriesToBeDisplayed('expenseTypes');
          break;
        default:
          break;
      }
    };

    return (
      <Wrapper>
        <StyledCloseFormSign onClick={props.handleClose} />
        <>
          {`${
            checkIfTransactionIsModified(props) ? 'MODIFY' : 'NEW'
          } TRANSACTION`}
        </>
        <>
          {!checkIfTransactionIsModified(props) &&
            renderNavigation(handleSourceChange)}
        </>
        <>
          {renderForm({
            ...props,
            initialValues: initialValues,
            categories: props[categoriesToBeDisplayed],
            currencies: props.currencies,
            handleSubmit: returnSubmitHandler({
              initialValues: initialValues,
              category: categoriesToBeDisplayed,
            }),
            dispatch: dispatch,
            handleClose: props.handleClose,
          })}
        </>
      </Wrapper>
    );
};

const renderNavigation = (props) => {
  return (
      <Tabs handleSourceChange={props}>
        <TabPane tab="1" title="Income" />
        <TabPane tab="2" title="Expense"/>
      </Tabs>
  );
};

const checkIfTransactionIsModified = (props) => {
  return props.initialValues.hasOwnProperty('id');
}

const renderForm = ({
  initialValues,
  categories,
  currencies,
  handleSubmit,
  dispatch,
  handleClose,
  ...props
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validations.getTransactionAdditionValidationSchema}
      onSubmit={(values) => {
        dispatch(handleSubmit(values))
        handleClose();
      }}
    >
      {({ setFieldValue, values, errors, dirty, handleChange }) => {
        return (
          <>
            <StyledForm>
                  <LabelWrapper label={'Amount'}>
                    <InputWithBorder
                      id="amount"
                      name="amount"
                      autoComplete="off"
                      placeholder="amount"
                      type="number"
                      step="0.5"
                    />
                  </LabelWrapper>
                  <LabelWrapper label="Currency">
                    <Dropdown
                      name="currency"
                      list={currencies}
                      isSearchable={true}
                      label="Select Currency"
                      value={currencies.filter((currency) => {
                        return currency.id === values['currency_id']
                          ? currency.value
                          : '';
                      })}
                      onChange={(selectedOption) => {
                        setFieldValue('currency', selectedOption.value);
                        setFieldValue('currency_id', selectedOption.id);
                      }}
                    />
                  </LabelWrapper>
                  <LabelWrapper label="Select category">
                    <Dropdown
                      name="category"
                      list={getCategories(categories.categories)}
                      isSearchable={true}
                      isLoading={false}
                      value={values.category ? { label: values.category } : ''}
                      onChange={(selectedOption) => {
                        setFieldValue('category', selectedOption.value);
                        setFieldValue(
                          'Icon',
                          categories.categories[selectedOption.value].Icon
                        );
                        setFieldValue('subcategory', null);
                      }}
                    />
                  </LabelWrapper>
                  <LabelWrapper label="Select subcategory">
                    <Dropdown
                      name="subcategory"
                      list={getSubcategories({
                        category: values.category,
                        dependencies: categories,
                      })}
                      value={
                        values.subcategory ? { label: values.subcategory } : ''
                      }
                      onChange={(selectedOption) => {
                        setFieldValue('category_id', selectedOption.id);
                        setFieldValue('subcategory', selectedOption.value);
                      }}
                    />
                  </LabelWrapper>
                  <LabelWrapper label="Date">
                    <DatePicker
                      name="transaction_date"
                      value={values.transaction_date}
                      onChange={setFieldValue}
                    />
                  </LabelWrapper>
                  <LabelWrapper label={'Write a note'}>
                    <TextArea
                      name={'comments'}
                      value={values.comments}
                      handleChange={handleChange}
                      placeholder="Place for your note"
                    />
                  </LabelWrapper>
                  <Button
                    type="submit"
                    disabled={!calculateIfFormCanBeSubmitted(errors, dirty)}
                  >
                  {initialValues.hasOwnProperty('id') ? 'MODIFY' : 'ADD'}
                  </Button>
            </StyledForm>
          </>
        );
      }}
    </Formik>
  );
};

const getCategories = props => {
  return Object.values(props).map(value => value);
}


const getSubcategories = ({category, dependencies}) => {
  if (dependencies.categories.hasOwnProperty(category) === false) return [];
  if(category === '') return [];
  const subcategoriesIds = dependencies.categories[category].subcategories;
  return subcategoriesIds.map(subcategoryId => dependencies.subcategories[subcategoryId]);
}

const returnSubmitHandler = ({initialValues, category}) => {
  if(initialValues.hasOwnProperty('id')){
    return category === 'incomeTypes' ? incomesActions.update : expensesActions.update;
  }

  return category === 'incomeTypes' ? incomesActions.add : expensesActions.add;

}

const setupCategoriesToBeDisplayed = (props) => {
  if(props.hasOwnProperty('type')){
    return props.type === 'income' ? 'incomeTypes' : 'expenseTypes';
  }

  return 'incomeTypes';
}

const calculateIfFormCanBeSubmitted = (errors, formInitialized) => {
  if(!formInitialized) return false;
  if(Object.keys(errors).length!==0) return false;

  return true;
}

TransactionHandlingForm.propTypes = {
    initialValues: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      subcategory: PropTypes.string.isRequired,
      transaction_date: PropTypes.string.isRequired,
      comments: PropTypes.string
    }).isRequired,
    handleClose: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    expenseTypes: state.expenseTypes.expenseTypes,
    incomeTypes: state.incomeTypes.incomeTypes,
    currencies: state.currencies.currencies
  };
}

export default connect(mapStateToProps)(TransactionHandlingForm);