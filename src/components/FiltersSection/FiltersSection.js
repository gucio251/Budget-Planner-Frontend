import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

import {filtrationActions}  from 'redux/actions/filtrationActions'
import {prepareCurrenciesForDropdown, prepareCategoriesForDropdown} from 'containers/TransactionHandlingForm/TransactionHandlingForm'
import Dropdown from 'components/UI/Dropdown'
import InputField from 'components/UI/InputField'
import { currencyActions } from 'redux/actions/currencyActions';

const Wrapper = styled.section`
  margin: 2em 0;
  display: block;

  & > *:not(:first-child){
    padding-top: 30px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
`;
const OptionsMenu = styled.ul`
  height: 40px;
  list-style: none;
  display: flex;
  background-color: white;
  border-radius: 4px;
`;

const Option = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px 0;
  outline: none;
  border: none;
  color: ${({ active }) => (active ? '#262C42' : '#707070')};
  cursor: pointer;

  &::after {
    display: ${({active}) => active ? "block" : 'none'};
    position: absolute;
    bottom: 0;
    content: '';
    width: 100%;
    height: 4px;
    background: ${({theme}) => theme.mainBlue};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
`;

const WiderDropdownWrapper = styled.div`
  width: 600px;
  position: relative;
`;

const DropdownWrapper = styled.div`
  width: 200px;
  position: relative;
`;

const FieldWrapper = styled.div`
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  top: -15px;
  color: #7A7D8A;
  font-size: 12px;
`;

const FiltersSection = () => {
    const incomeTypes = useSelector(state => state.incomeTypes.incomeTypes);
    const expenseTypes = useSelector(state => state.expenseTypes.expenseTypes);
    const availableCurrenciesState = useSelector(state => state.currencies)
    const filtration = useSelector(state => state.filtration);
    const dispatch = useDispatch();

    const handleCategoryChange = value => {
      if (value !== null) {
        if (filtration.categories.length > value.length)
          removeUnnecessarySubcategories(value);
        dispatch(filtrationActions.setCategoryFilter(value));
      } else {
        dispatch(filtrationActions.setCategoryFilter([]));
        dispatch(filtrationActions.setSubcategoryFilter([]));
      }
    }

    const removeUnnecessarySubcategories = currentCategories => {
      const newCategories = currentCategories.map(category => category.value);

      const [deletedCategory] = filtration.categories.filter(
        (category) => !newCategories.includes(category.value)
      );
      const subcategoriesToBeDeleted =
        deletedCategory.type === 'expenseTypes'
          ? expenseTypes.categories[deletedCategory.value].subcategories
          : incomeTypes.categories[deletedCategory.value].subcategories;

      const newSubcategories = filtration.subcategories.filter(subcategory => !subcategoriesToBeDeleted.includes(subcategory.value));
      dispatch(filtrationActions.setSubcategoryFilter(newSubcategories));
    }

    const handleAmountFromChange = (e) => {
      e.target.value === ''
        ? dispatch(filtrationActions.setAmountFromFilter(null))
        : dispatch(
            filtrationActions.setAmountFromFilter(parseFloat(e.target.value))
          );
    };

    const handleAmountToChange = (e) => {
      e.target.value === ''
        ? dispatch(filtrationActions.setAmountToFilter(null))
        : dispatch(
            filtrationActions.setAmountToFilter(parseFloat(e.target.value))
          );
    };
    const changeActiveItem = (e) => {
        const clickedElementName = e.target.textContent

        const type =
          clickedElementName === 'Incomes'
            ? 'income'
            : clickedElementName === 'Expenses'
            ? 'expense'
            : 'all';
        dispatch(filtrationActions.setTransactionTypeFilter(type));
        dispatch(filtrationActions.setCategoryFilter([]));
        dispatch(filtrationActions.setSubcategoryFilter([]));
    };

    const checkIfAllowedSign = (evt) => {
        ['e', 'E', '+', '-', '.'].includes(evt.key) && evt.preventDefault();
    }

    return (
      <Wrapper>
        <Row>
          <OptionsMenu>
            {['all', 'expenses', 'incomes'].map((name, index) => {
              return (
                <Option
                  key={index}
                  tabIndex={index}
                  onClick={changeActiveItem}
                  active={name.includes(filtration.type)}
                >
                  {`${name.charAt(0).toUpperCase()}${name.slice(
                    1,
                    name.length
                  )}`}
                </Option>
              );
            })}
          </OptionsMenu>
          <WiderDropdownWrapper>
            <Label htmlFor="categories">Select category</Label>
            <Dropdown
              isMulti={true}
              list={prepareOptions(
                incomeTypes.categories,
                expenseTypes.categories,
                filtration.type
              )}
              onChange={handleCategoryChange}
              value={filtration.categories}
              isSearchable={true}
              name="categories"
            />
          </WiderDropdownWrapper>
          <WiderDropdownWrapper>
            <Label htmlFor="subcategories">Select subcategory</Label>
            <Dropdown
              isMulti={true}
              list={prepareSubcategories(
                incomeTypes,
                expenseTypes,
                filtration.categories
              )}
              onChange={(value) => {
                dispatch(filtrationActions.setSubcategoryFilter(value));
              }}
              value={filtration.subcategories}
              isSearchable={true}
              name="subcategories"
            />
          </WiderDropdownWrapper>
        </Row>
        <Row>
          <FieldWrapper>
            <Label htmlFor="amountFrom">Amount From</Label>
            <InputField
              name="amountFrom"
              type="number"
              step="0.5"
              handleKeyDown={checkIfAllowedSign}
              placeholder={filtration.amountFrom == null ? '0,00' : null}
              handleChange={handleAmountFromChange}
              value={filtration.amountFrom}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Label htmlFor="amountTo">Amount To</Label>
            <InputField
              name="amountTo"
              type="number"
              step="0.5"
              handleKeyDown={checkIfAllowedSign}
              placeholder={filtration.amountTo == null ? '0,00' : null}
              handleChange={handleAmountToChange}
              value={filtration.amountTo}
            />
          </FieldWrapper>
          <DropdownWrapper>
            <Label htmlFor="currencies">Currency</Label>
            <Dropdown
              list={prepareCurrenciesForDropdown(
                availableCurrenciesState.currencies
              )}
              value={{
                label:
                  availableCurrenciesState.currencies[
                    availableCurrenciesState.active
                  ].name,
              }}
              onChange={(value) =>
                dispatch(currencyActions.changeActiveCurrency(value.value))
              }
              isSearchable={true}
              name="currencies"
            />
          </DropdownWrapper>
        </Row>
      </Wrapper>
    );
};

const prepareOptions = (incomeTypes, expenseTypes,activeElement) => {
    let calculatedIncomes = [];
    let calculatedExpenses = [];

    if(activeElement === 'all' || activeElement === 'income'){
      calculatedIncomes = Object.keys(incomeTypes).map((key) =>
        returnDropdownValuesForCategories(incomeTypes[key], 'incomeTypes')
      );
    }

    if(activeElement === 'all' || activeElement === 'expense'){
      calculatedExpenses = Object.keys(expenseTypes).map((key) =>
        returnDropdownValuesForCategories(expenseTypes[key], 'expenseTypes')
      );
    }

    return [].concat(calculatedIncomes, calculatedExpenses)
}

const prepareSubcategories = (incomeTypes, expenseTypes, activeCategories) => {
  const result = activeCategories.reduce((agg, {type, value}) => {
    const subcategories =
      type === 'incomeTypes'
        ? incomeTypes.categories[value].subcategories
        : expenseTypes.categories[value].subcategories

    if(type === 'incomeTypes'){
      return {
        ...agg,
        incomeSubcategories: [].concat(
          ...agg.incomeSubcategories,
          subcategories
        ),
      };
    }else{
      return {
        ...agg,
        expenseSubcategories: [].concat(
          ...agg.expenseSubcategories,
          subcategories
        ),
      };
    }
  }, {incomeSubcategories: [], expenseSubcategories: []})

  const allIncomeSub = result.incomeSubcategories.map(incomeSubcategory => {
    const {id, name} = incomeTypes.subcategories[incomeSubcategory];
    return {value: id, label: name, type: 'income'};
  })

  const allExpenseSub = result.expenseSubcategories.map(expenseSubcategory => {
    const { id, name } = expenseTypes.subcategories[expenseSubcategory];
    return { value: id, label: name, type: 'expense' };
  })

  return [].concat(...allIncomeSub, ...allExpenseSub);
}

const returnDropdownValuesForCategories = ({id, name, Icon}, type) => {
  return {
    value: id,
    label: name,
    Icon,
    type
  };
}

export default FiltersSection;