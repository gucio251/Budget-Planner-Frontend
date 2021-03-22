import React, {useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

import DateDisplayer from 'components/UI/DateDisplayer';
import {filtrationActions}  from 'redux/actions/filtrationActions';
import {prepareCurrenciesForDropdown} from 'containers/TransactionHandlingForm/TransactionHandlingForm';
import Dropdown from 'components/UI/Dropdown';
import InputField from 'components/UI/InputField';
import { currencyActions } from 'redux/actions/currencyActions';
import { ReactComponent as CloseSign} from 'assets/icons/closeSign.svg'
import SearchField from 'components/UI/SearchField';

const MobileRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  &>*:nth-child(2){
    display: none;
  }

  ${({theme}) => theme.devices.mobile}{
    &>*:nth-child(2){
      display: block;
    }
  }
`

const Wrapper = styled.section`
  margin: 2em 0;
  display: flex;
  flex-direction: column;

  & > *:not(:first-child){
    padding-top: 30px;
  }

  ${({theme}) => theme.devices.mobile}{
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: ${({displayOnMobile}) => displayOnMobile ? 'block' : 'none'};
    background-color: #F6F6F8;
    z-index: 4;
    top: 0;
    left: 0;
    margin-top: 0;
    padding: 0 1em;
  }
`;

const MobileContent = styled.div`
  display: none;
  margin-top: 20px;

  ${({theme}) => theme.devices.mobile}{
    display: ${({displayOnMobile}) => displayOnMobile ? 'flex' : 'none'};
    justify-content: space-between;
  }
`;

const StyledCloseSign = styled(CloseSign)`
  cursor: pointer;

  &:hover{
    transform: scale(1.2);
    transition: all 0.3s ease;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 15px;
`;

const StyledParagraph = styled.p`
  font-size: 2em;
  font-weight: 500;

  ${({theme}) => theme.devices.mobile}{
    font-size: 1em;
  }
`
const OptionsMenu = styled.ul`
  height: 40px;
  margin: 10px 0;
  list-style: none;
  display: flex;
  background-color: white;
  border-radius: 4px;

  ${({theme}) => theme.devices.mobile}{
    width: 100%;
  }
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
  width: 250px;
  margin: 10px 0;
  position: relative;

  ${({theme}) => theme.devices.mobile}{
    width: 100%;
  }
`;

const SmallerDropdownWrapper = styled.div`
  width: 250px;
  position: relative;

  ${({theme}) => theme.devices.mobile}{
    width: 48%;
  }
`;

const FieldWrapper = styled.div`
  position: relative;
  margin: 10px 0;

  ${({theme}) => theme.devices.mobile}{
    width: 48%;
  }
`;

const Label = styled.label`
  position: absolute;
  top: -15px;
  color: #7A7D8A;
  font-size: 12px;
`;

const Button = styled.button`
  background-color: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.mainBlue};
  color: ${({ transparent, theme }) =>
    !transparent ? 'white' : theme.mainBlue};
  border-radius: 4px;
  font-size: 1em;
  padding: 0em 2em;
  height: 40px;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover{
    transform: translateY(-10px);
  }
`;

const FiltersSection = () => {
    const incomeTypes = useSelector(state => state.incomeTypes.incomeTypes);
    const expenseTypes = useSelector(state => state.expenseTypes.expenseTypes);
    const availableCurrenciesState = useSelector(state => state.currencies)
    const filtration = useSelector(state => state.filtration);
    const dispatch = useDispatch();
    const [filtersVisibilityOnMobile, setFiltersVisibilityOnMobile] = useState(false);

    const handleCategoryChange = value => {
      if (value !== null) {
        if (filtration.filtersToBeConfirmed.categories.length > value.length)
          removeUnnecessarySubcategories(value);
          dispatch(filtrationActions.setCategoryFilter(value));
      } else {
          dispatch(filtrationActions.setCategoryFilter([]));
          dispatch(filtrationActions.setSubcategoryFilter([]));
      }
    }

    const handleSubcategoryChange = value => {
      return value !== null
        ? dispatch(filtrationActions.setSubcategoryFilter(value))
        : dispatch(filtrationActions.setSubcategoryFilter([]));
    }

    const removeUnnecessarySubcategories = currentCategories => {
      const newCategories = currentCategories.map(category => category.value);

      const [deletedCategory] = filtration.filtersToBeConfirmed.categories.filter(
        (category) => !newCategories.includes(category.value)
      );

      const [id, ...rest] = deletedCategory.value.split('/');
      const subcategoriesToBeDeleted =
        deletedCategory.type === 'expenseTypes'
          ? expenseTypes.categories[id].subcategories
          : incomeTypes.categories[id].subcategories;

      const newSubcategories = filtration.filtersToBeConfirmed.subcategories.filter(
        (subcategory) => !subcategoriesToBeDeleted.includes(subcategory.value)
      );
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


    const handleFiltersAddition = () => {
      dispatch(filtrationActions.applyFilters());

      if(filtersVisibilityOnMobile) handleFilterSectionVisibility();
    }

    const handleFilterRemoval = () => {
      dispatch(filtrationActions.clearFilters());

      if(filtersVisibilityOnMobile) handleFilterSectionVisibility();
    }

    const handleFilterSectionVisibility = () => setFiltersVisibilityOnMobile(filtersVisibilityOnMobile => !filtersVisibilityOnMobile);
    return (
      <>
        <MobileRow displayOnMobile={filtersVisibilityOnMobile}>
          <Row>
            <StyledParagraph>
              Transactions
            </StyledParagraph>
          </Row>
          <Button transparent={true} onClick={handleFilterSectionVisibility}>
            Filters
          </Button>
        </MobileRow>
        <Wrapper displayOnMobile={filtersVisibilityOnMobile}>
          <MobileContent displayOnMobile={filtersVisibilityOnMobile}>
            <StyledParagraph>
              Filters
            </StyledParagraph>
            <StyledCloseSign onClick={handleFilterSectionVisibility}/>
          </MobileContent>
          <Row>
            <OptionsMenu>
              {['all', 'expenses', 'incomes'].map((name, index) => {
                return (
                  <Option
                    key={index}
                    tabIndex={index}
                    onClick={changeActiveItem}
                    active={name.includes(filtration.filtersToBeConfirmed.type)}
                  >
                    {`${name.charAt(0).toUpperCase()}${name.slice(
                      1,
                      name.length
                    )}`}
                  </Option>
                );
              })}
            </OptionsMenu>
            <DropdownWrapper>
              <Label htmlFor="categories">Select category</Label>
              <Dropdown
                isMulti={true}
                list={prepareOptions(
                  incomeTypes.categories,
                  expenseTypes.categories,
                  filtration.filtersToBeConfirmed.type
                )}
                onChange={handleCategoryChange}
                value={filtration.filtersToBeConfirmed.categories}
                isSearchable={true}
                name="categories"
              />
            </DropdownWrapper>
            <DropdownWrapper>
              <Label htmlFor="subcategories">Select subcategory</Label>
              <Dropdown
                isMulti={true}
                list={prepareSubcategories(
                  incomeTypes,
                  expenseTypes,
                  filtration.filtersToBeConfirmed.categories
                )}
                onChange={handleSubcategoryChange}
                value={filtration.filtersToBeConfirmed.subcategories}
                isSearchable={true}
                name="subcategories"
              />
            </DropdownWrapper>
            <FieldWrapper>
              <Label htmlFor="amountFrom">Amount From</Label>
              <InputField
                name="amountFrom"
                type="number"
                step="0.5"
                handleKeyDown={checkIfAllowedSign}
                placeholder={
                  filtration.filtersToBeConfirmed.amountFrom == null
                    ? '0,00'
                    : null
                }
                handleChange={handleAmountFromChange}
                value={filtration.filtersToBeConfirmed.amountFrom}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Label htmlFor="amountTo">Amount To</Label>
              <InputField
                name="amountTo"
                type="number"
                step="0.5"
                handleKeyDown={checkIfAllowedSign}
                placeholder={
                  filtration.filtersToBeConfirmed.amountTo == null ? '0,00' : null
                }
                handleChange={handleAmountToChange}
                value={filtration.filtersToBeConfirmed.amountTo}
              />
            </FieldWrapper>
          </Row>
          <Row>
            <SmallerDropdownWrapper>
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
            </SmallerDropdownWrapper>
            <DateDisplayer />
            <SearchField />
            <Button onClick={handleFiltersAddition}>Apply</Button>
            <Button onClick={handleFilterRemoval} transparent={true}>Clear all filters</Button>
          </Row>
        </Wrapper>
      </>
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
    const [id, ...rest] = value.split('/')
    const subcategories =
      type === 'incomeTypes'
        ? incomeTypes.categories[id].subcategories
        : expenseTypes.categories[id].subcategories

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
    value: `${id}/${name}`,
    label: name,
    Icon,
    type
  };
}

export default FiltersSection;