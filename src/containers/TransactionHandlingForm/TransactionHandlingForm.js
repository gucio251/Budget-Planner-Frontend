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
import { getIconBySubcategoryId } from 'redux/reducers/expenseTypesReducer';

const Wrapper = styled.div`
  max-height: 100%;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: min(450px, 100vw);
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
  category: '',
  currency_id: '',
  transaction_type_id: '',
  date: getTodaysDate(),
  comments: '',
  type: 'income'
};

const TransactionHandlingForm = props => {
    const dispatch = useDispatch();
    const [currentTransactionType, setCurrentTransactionType] = useState(props.initialValues.id ? `${props.initialValues.type}Types` : 'incomeTypes')

    const handleTabChange = (name) => {
      debugger;
      setCurrentTransactionType(`${name.charAt(0).toLowerCase() + name.slice(1)}Types`);
    }
    return (
      <Wrapper>
        <LineWrapper>
          {`${
            props.initialValues.id ? 'Modify' : 'Add new'
          } transaction`}
          <StyledCloseFormSign onClick={() => dispatch(modalActions.close())} />
        </LineWrapper>
        <>
          {!props.initialValues.id &&
            renderNavigation(handleTabChange)}
        </>
        <>
          {renderForm({
            ...props,
            initialValues: {
              ...props.initialValues,
              type: currentTransactionType.slice(0,6)
            },
            transactionTypes: prepareCategoriesForDropdown(props[currentTransactionType]),
            currencies: prepareCurrenciesForDropdown(props.currencies),
            handleSubmit: returnSubmitHandler(
              {
              ...props.initialValues,
              type: currentTransactionType.slice(0,6)
            }),
            dispatch: dispatch,
            handleClose: ()=> {
              dispatch(modalActions.close())},
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

const fieldsName = {
  amount: 'amount',
  currency: 'currency_id',
  category: 'category',
  subcategory: 'transaction_type_id',
  transactionDate: 'date',
  comment: 'comments',
};

const renderForm = ({
  initialValues,
  transactionTypes,
  currencies,
  handleSubmit,
  dispatch,
  handleClose
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validations.getTransactionAdditionValidationSchema}
      onSubmit={(values) => {
        dispatch(handleSubmit(values));
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
                    value={currencies.filter((currency) => parseInt(currency.value) === values.currency_id)}
                    list={currencies}
                    isSearchable={false}
                    label="Select Currency"
                    onChange={({ value }) => {
                      setFieldValue('currency_id', parseInt(value));
                    }}
                  />
                </LabelWrapper>
              </FormLineWrapper>
              <LabelWrapper label="Select category">
                <Dropdown
                  name={fieldsName.category}
                  value={values.category}
                  onChange={(value) => {
                    setFieldValue('category', value);
                    setFieldValue('transaction_type_id', null);
                  }}
                  list={transactionTypes.categories}
                  isSearchable={false}
                />
              </LabelWrapper>
              <LabelWrapper label="Select subcategory">
                <Dropdown
                  name={fieldsName.subcategory}
                  value={
                    values.transaction_type_id
                      ? transactionTypes.subcategories[
                          values.category.value
                        ].filter(
                          (subcategory) =>
                            subcategory.value === values.transaction_type_id
                        )
                      : null
                  }
                  list={transactionTypes.subcategories[values.category.value]}
                  onChange={({ value }) => {
                    setFieldValue('transaction_type_id', value);
                  }}
                />
              </LabelWrapper>
              <LabelWrapper label="Date">
                <SingleMonthDatePicker
                  name={fieldsName.transactionDate}
                  value={values.transaction_date}
                  onChange={setFieldValue}
                />
              </LabelWrapper>
              <LabelWrapper label={'Write a note'}>
                <TextArea
                  name={fieldsName.comment}
                  value={values.comments}
                  handleChange={handleChange}
                  placeholder="Aa"
                />
              </LabelWrapper>
              <Button
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

export const prepareCategoriesForDropdown = transactionTypes => {
  let dropdownCategories=[];
  let dropdownSubcategories={};

  const {categories, subcategories} = transactionTypes;

  Object.keys(categories).forEach(transactionTypeId => {
    dropdownCategories.push({
      value: transactionTypeId,
      label: categories[transactionTypeId].name,
      Icon: categories[transactionTypeId].Icon
    });

    let arr = [];

    categories[transactionTypeId].subcategories.forEach(subcategoryId => {
      arr.push({value: subcategoryId, label: subcategories[subcategoryId].name})
    });

    dropdownSubcategories[transactionTypeId] = arr;
  })

  return {
    categories: dropdownCategories,
    subcategories: dropdownSubcategories
  }
}

export const prepareCurrenciesForDropdown = currencies => {
  if (Object.keys(currencies).length === 0) return [];

  return Object.keys(currencies).map(currencyId => {
    return {
      value: currencyId,
      label: currencies[currencyId].name
    }
  });
}

const returnSubmitHandler = (props) => {
  if (props.id) {
    return props.type === 'income'
      ? incomesActions.update
      : expensesActions.update;
  }

  return props.type === 'income' ? incomesActions.add : expensesActions.add;

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

const getFullTransactionInfo = (transactions, transactionTypesState, transaction_id) => {
  let transaction = transactions[transaction_id];
  const category =
    transactionTypesState.subcategories[transaction.transaction_type_id]
      .category_id;
  const categoryName = transactionTypesState.categories[category].name;
  const Icon = getIconBySubcategoryId(
    transaction.transaction_type_id,
    transactionTypesState
  );
  return transaction = {
    ...transaction,
    category: {
      value: category.toString(),
      label: categoryName,
      Icon,
    },
  };
}

const mapStateToProps = (state) => {
  const calculateInitialValues = () => {
    let transaction;
      switch (state.modalReducer.modalProps.type) {
        case 'income':
          const incomes = state.incomes.incomes;
          const incomeTypes = state.incomeTypes.incomeTypes;
          const income_id = state.modalReducer.modalProps.id;
          transaction = getFullTransactionInfo(incomes, incomeTypes, income_id);
          break;
        case 'expense':
          const expenses = state.expenses.expenses;
          const expenseTypes = state.expenseTypes.expenseTypes;
          const expense_id = state.modalReducer.modalProps.id;
          transaction = getFullTransactionInfo(expenses, expenseTypes, expense_id);
          break
        default:
          transaction = initialValues;
          break;
    }
    return transaction;
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