import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button';
import DatePicker from 'components/UI/DatePicker';
import Dropdown from 'components/UI/Dropdown';
import InputWithBorder from 'components/UI/InputWithBorder';
import LabelWrapper from 'components/UI/LabelWrapper';
import TextArea from 'components/UI/TextArea';
import { connect } from 'react-redux';
import {
    Container,
    Grid,
    Card
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TabPane from 'components/UI/TabPane';
import Tabs from 'components/Tabs/Tabs';
import { Formik, Form } from 'formik';
import { validations } from 'components/validationSchemas-yup/validationSchemas-yup';
import { incomesActions } from 'redux/actions/incomesActions';
import { expensesActions } from 'redux/actions/expensesActions';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles(() => ({
  root: {
    width: '50%',
    backgroundColor: '#f8f9fb',
    padding: '5%'
  }
}));

const TransactionHandlingForm = props => {
    const dispatch = useDispatch();
    const [categoriesToBeDisplayed, setCategoriesToBeDisplayed] = useState(setupCategoriesToBeDisplayed(props.initialValues));
    const [initialValues, setInitialValues] = useState(props.initialValues);
    const classes = useStyles();

    const handleSourceChange = (name) => {
      switch(name){
        case 'Income':
          setCategoriesToBeDisplayed('incomeTypes');
          setInitialValues({ ...initialValues, type: 'income' });
          break;
        case 'Expense':
          setInitialValues({...initialValues, type: 'expense'})
          setCategoriesToBeDisplayed('expenseTypes');
          break;
        default:
          break;
      }
    };

    return (
      <Container>
        <Card className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} align="right"></Grid>
            <Grid item xs={12} align="left">
              {`${
                props.initialValues.hasOwnProperty('id') ? 'MODIFY' : 'NEW'
              } TRANSACTION`}
            </Grid>
            {!props.initialValues.hasOwnProperty('id') &&
              renderNavigation(handleSourceChange)}
          </Grid>
          {renderForm({
            initialValues: initialValues,
            categories: props[categoriesToBeDisplayed],
            currencies: props.currencies,
            handleSubmit: returnSubmitHandler({initialValues:props.initialValues, categoriesToBeDisplayed}),
            dispatch: dispatch,
          })}
        </Card>
      </Container>
    );
};

const renderNavigation = (props) => {
  return (
    <Grid item xs={12} align="left">
      <Tabs handleSourceChange={props}>
        <TabPane tab="1" title="Income" />
        <TabPane tab="2" title="Expense"/>
      </Tabs>
    </Grid>
  );
};

const renderForm = ({
  initialValues,
  categories,
  currencies,
  handleChange,
  handleSubmit,
  dispatch,
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validations.getTransactionAdditionValidationSchema}
      onSubmit={(values) => dispatch(handleSubmit(values))}
    >
      {({ setFieldValue, values, errors, dirty, handleChange }) => {
        return (
          <>
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <LabelWrapper label={'Amount'}>
                    <InputWithBorder
                      id="amount"
                      name="amount"
                      type="text"
                      autoComplete="off"
                      placeholder="amount"
                      type="number"
                      step="0.5"
                    />
                  </LabelWrapper>
                </Grid>
                <Grid item xs={4}>
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
                </Grid>
                <Grid item xs={12}>
                  <LabelWrapper label="Select category">
                    <Dropdown
                      name="category"
                      list={categories}
                      isSearchable={true}
                      isLoading={false}
                      value={values.category ? { label: values.category } : ''}
                      onChange={(selectedOption) => {
                        setFieldValue('category', selectedOption.value);
                        setFieldValue('subcategory', null);
                      }}
                    />
                  </LabelWrapper>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <LabelWrapper label="Date">
                    <DatePicker
                      name="transaction_date"
                      value={values.transaction_date}
                      onChange={setFieldValue}
                    />
                  </LabelWrapper>
                </Grid>
                <Grid item xs={12}>
                  <LabelWrapper label={'Write a note'}>
                    <TextArea
                      name={'comments'}
                      value={values.comments}
                      handleChange={handleChange}
                      placeholder="Place for your note"
                    />
                  </LabelWrapper>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    disabled={!calculateIfFormCanBeSubmitted(errors, dirty)}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

const getSubcategories = ({category, dependencies}) => {
  if(category.length===0){
    return [];
  }
  const [result] = dependencies.filter((dependency) => {
    return dependency.value === category
  });

  if(result === undefined) return [];

  return result.subcategories;
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
    
};

const mapStateToProps = (state) => {
  return {
    expenseTypes: state.expenseTypes.expenseTypes,
    incomeTypes: state.incomeTypes.incomeTypes,
    currencies: state.currencies.currencies
  };
}

export default connect(mapStateToProps)(TransactionHandlingForm);