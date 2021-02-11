import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { incomesActions } from 'redux/actions/incomesActions';
import { expensesActions } from 'redux/actions/expensesActions';
import { modalActions } from 'redux/actions/modalActions';
import { validations } from 'components/validationSchemas-yup/validationSchemas-yup';
import { getTodaysDate } from 'Utils/functions';

import Button from 'components/UI/Button';
import SingleMonthDatePicker from 'components/UI/SingleMonthDatePicker';
import Dropdown from 'components/UI/Dropdown';
import InputWithBorder from 'components/UI/InputWithBorder';
import LabelWrapper from 'components/UI/LabelWrapper';
import { ReactComponent as CloseFormSign } from 'assets/icons/closeSign.svg';
import TextArea from 'components/UI/TextArea';
import TabPane from 'components/UI/TabPane';
import Tabs from 'components/Tabs/Tabs';

const Wrapper = styled.div`
  max-height: 100%;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(450px, 100%);
  background-color: #f8f9fb;
  padding: 2em;
  border-radius: 4px;
`;

const LineWrapper = styled.div`
  font-size: 1.25em;
  font-weight: 450;
  display: flex;
  justify-content: space-between;
`

const StyledCloseFormSign = styled(CloseFormSign)`
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FormLineWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-column-gap: 1em;
`

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
        <LineWrapper>
          {`${
            checkIfTransactionIsModified(props) ? 'Modify' : 'Add new'
          } transaction`}
          <StyledCloseFormSign onClick={() => dispatch(modalActions.close())} />
        </LineWrapper>
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
        <TabPane tab='1' title='Income' />
        <TabPane tab='2' title='Expense'/>
      </Tabs>
  );
};

const checkIfTransactionIsModified = (props) => {
  return props.initialValues.hasOwnProperty('id');
}

const fieldsName = {
  amount: 'amount',
  currency: 'currency',
  category: 'category',
  subcategory: 'subcategory',
  transactionDate: 'transaction_date',
  comment: 'comments'
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
              <FormLineWrapper>
                <LabelWrapper label={'Amount'}>
                  <InputWithBorder
                    name={fieldsName.amount}
                    autoComplete="off"
                    type="number"
                    step="0.5"
                  />
                </LabelWrapper>
                <LabelWrapper label="Currency">
                  <Dropdown
                    name={fieldsName.currency}
                    list={currencies}
                    isSearchable={false}
                    label="Select Currency"
                    value={convertStringToDropdowObject(
                      values[fieldsName.currency]
                    )}
                    onChange={({ value, id }) => {
                      setFieldValue('currency', value);
                      setFieldValue('currency_id', id);
                    }}
                  />
                </LabelWrapper>
              </FormLineWrapper>
              <LabelWrapper label="Select category">
                <Dropdown
                  name={fieldsName.category}
                  list={getCategories(categories.categories)}
                  isSearchable={false}
                  value={convertStringToDropdowObject(
                    values[fieldsName.category]
                  )}
                  onChange={({ value }) => {
                    setFieldValue('Icon', categories.categories[value].Icon);
                    setFieldValue(fieldsName.category, value);
                    setFieldValue('subcategory', null);
                  }}
                />
              </LabelWrapper>
              <LabelWrapper label="Select subcategory">
                <Dropdown
                  name={fieldsName.subcategory}
                  list={getSubcategories({
                    category: values.category,
                    dependencies: categories,
                  })}
                  value={convertStringToDropdowObject(
                    values[fieldsName.subcategory]
                  )}
                  onChange={({ value, id }) => {
                    setFieldValue('category_id', id);
                    setFieldValue(fieldsName.subcategory, value);
                  }}
                />
              </LabelWrapper>
              <LabelWrapper label="Date">
                <SingleMonthDatePicker
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
                  placeholder="Aa"
                />
              </LabelWrapper>
              <Button
                color="#264AE7"
                type="submit"
                disabled={!calculateIfFormCanBeSubmitted(errors, dirty)}
              >
                {initialValues.hasOwnProperty('id') ? 'Modify' : 'Add'}
              </Button>
            </StyledForm>
          </>
        );
      }}
    </Formik>
  );
};

export const getCategories = props => {
  return Object.values(props).map(value => {return {...value, label: value.value}});
}

const convertStringToDropdowObject = value => {
  return {value: value, label: value}
}


export const getSubcategories = ({category, dependencies}) => {
  if (dependencies.categories.hasOwnProperty(category) === false) return [];
  if(category === '') return [];
  const subcategoriesIds = dependencies.categories[category].subcategories;
  return subcategoriesIds.map(subcategoryId => {return {
    ...dependencies.subcategories[subcategoryId],
    label: dependencies.subcategories[subcategoryId].value,
  };});
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
  const calculateInitialValues = () => {
    let transaction;
    if(Object.keys(state.modalReducer.modalProps).length === 0) {
      return initialValues;
    }else{
      switch (state.modalReducer.modalProps.type) {
        case 'income':
          [transaction] = state.incomes.incomes.filter(
            (income) => income.id === state.modalReducer.modalProps.id
          );
          break;
        case 'expense':
          [transaction] = state.expenses.expenses.filter(
            (expense) => expense.id === state.modalReducer.modalProps.id
          );
          break;
        default:
          break;
      }

      return transaction;
    }
  }

  return {
    expenseTypes: state.expenseTypes.expenseTypes,
    incomeTypes: state.incomeTypes.incomeTypes,
    currencies: state.currencies.currencies,
    initialValues: calculateInitialValues(),
    type: state.modalReducer.modalProps.type,
  };
}

export default connect(mapStateToProps)(TransactionHandlingForm);