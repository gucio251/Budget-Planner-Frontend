import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import {filtrationActions}  from 'redux/actions/filtrationActions'
import {getCategories} from 'containers/TransactionHandlingForm/TransactionHandlingForm'
import Dropdown from 'components/UI/Dropdown'
import InputField from 'components/UI/InputField'
import { currencyActions } from 'redux/actions/currencyActions';

const Wrapper = styled.section`
  margin: 20px 0;
  display: flex;
  gap: 10px;
`;
const OptionsMenu = styled.ul`
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
    const [activeElement, setActiveElement] = useState({number: 0, name: 'All'});
    const dispatch = useDispatch();

    const handleAmountFromChange = (e) => {
      dispatch(filtrationActions.setAmountFromFilter(parseFloat(e.target.value)))
    };

    const handleAmountToChange = (e) => {
        dispatch(
        filtrationActions.setAmountToFilter(parseFloat(e.target.value))
        );
    };
    const changeActiveItem = (e) => {
        const clickedElementName = e.target.textContent
        setActiveElement({ number: e.target.tabIndex, name: clickedElementName});
        const type =
          clickedElementName === 'Incomes'
            ? 'income'
            : clickedElementName === 'Expenses'
            ? 'expense'
            : clickedElementName;
        dispatch(filtrationActions.setTransactionTypeFilter(type));
    };

    return (
      <Wrapper>
        <OptionsMenu>
          {['All', 'Expenses', 'Incomes'].map((name, index) => {
            return (
              <Option
                tabIndex={index}
                onClick={changeActiveItem}
                active={index === activeElement.number}
              >
                {name}
              </Option>
            );
          })}
        </OptionsMenu>
        <DropdownWrapper>
          <Label htmlFor="categories">Choose categories</Label>
          <Dropdown
            list={prepareOptions(incomeTypes, expenseTypes, activeElement.name)}
            onChange={({ value }) => {
              dispatch(filtrationActions.setCategoryFilter(value));
            }}
            value={{ value: filtration.category, label: filtration.category }}
            isSearchable={true}
            name="categories"
          />
        </DropdownWrapper>
        <FieldWrapper>
          <Label htmlFor="amountFrom">Amount From</Label>
          <InputField
            name="amountFrom"
            type="number"
            step="0.5"
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
            placeholder={filtration.amountTo == null ? '0,00' : null}
            handleChange={handleAmountToChange}
            value={filtration.amountTo}
          />
        </FieldWrapper>
        <DropdownWrapper>
          <Label htmlFor="currencies">Currency</Label>
          <Dropdown
            list={availableCurrenciesState.currencies}
            onChange={(value) =>
              dispatch(currencyActions.changeActiveCurrency(value.value))
            }
            indexOfDefaultValue={availableCurrenciesState.currencies.findIndex(
              (currency) => currency.value === availableCurrenciesState.active
            )}
            isSearchable={true}
            name="currencies"
          />
        </DropdownWrapper>
      </Wrapper>
    );
};

const prepareOptions = (incomeTypes, expenseTypes,activeElement) => {
    switch(activeElement){
        case 'All':
            return [].concat({value: "All"}, getCategories(incomeTypes.categories), getCategories(expenseTypes.categories))
        case 'Incomes':
            return [].concat({value: "All"}, getCategories(incomeTypes.categories))
        case 'Expenses':
            return [].concat({value: "All"}, getCategories(expenseTypes.categories))
        default:
            break;
    }
}

FiltersSection.propTypes = {
    
};

export default FiltersSection;