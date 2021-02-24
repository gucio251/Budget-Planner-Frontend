import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  StyledOverview,
  Row,
  WelcomeText,
  StyledDateMenu,
  StyledDropdown,
  RowWithoutSpaceBetween,
} from './DashboardOverview.styled';

import BudgetSummary from 'containers/BudgetSummary/BudgetSummary';
import CustomDropdownDashboard from 'components/UI/Dropdown';
import DashboardDateMenu from 'components/DashboardDateMenu/DashboardDateMenu';
import DashboardDisplayWindow from 'components/DashboardDisplayWindow/DashboardDisplayWindow';
import FilteredTransactionsContainer from 'containers/FilteredTransactionsContainer/FilteredTransactionsContainer';
import GraphAndStatsGroupedByType from 'components/GraphAndStatsGroupedByType/GraphAndStatsGroupedByType';
import SortedTransactions from 'containers/SortedTransactions/SortedTransactions';
import TransactionsDisplayer from 'components/TransactionsDisplayer/TransactionsDisplayer';
import TransformToDropdownList from 'containers/TransformToDropdownList/TransformToDropdownList';

import { currencyActions } from 'redux/actions/currencyActions';

const DashboardOverview = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.login);

  return (
    <FilteredTransactionsContainer>
      {({
        recalculatedExpenses,
        recalculatedIncomes,
        availableCurrenciesState,
      }) => (
        <StyledOverview>
          <Row>
            <WelcomeText>{`Hi ${login}, welcome back!`}</WelcomeText>
            <StyledDateMenu>
              <StyledDropdown>
                <TransformToDropdownList
                  objectToBeConverted={availableCurrenciesState.currencies}
                >
                  {({ dropdownList }) => (
                    <CustomDropdownDashboard
                      list={dropdownList}
                      value={{label:availableCurrenciesState.currencies[availableCurrenciesState.active].name}}
                      onChange={({value}) => dispatch(currencyActions.changeActiveCurrency(value))}
                      isSearchable={true}
                      name="currencies"
                    />
                  )}
                </TransformToDropdownList>
              </StyledDropdown>
              <DashboardDateMenu />
            </StyledDateMenu>
          </Row>
          <RowWithoutSpaceBetween>
            <BudgetSummary
              expenses={recalculatedExpenses}
              incomes={recalculatedIncomes}
              Icon={availableCurrenciesState.Icon}
            />
            <DashboardDisplayWindow title="Expenses / incomes">
              <GraphAndStatsGroupedByType
                expenses={recalculatedExpenses}
                incomes={recalculatedIncomes}
              />
            </DashboardDisplayWindow>
          </RowWithoutSpaceBetween>
          <SortedTransactions
            allTransactions={[].concat(
              recalculatedIncomes,
              recalculatedExpenses
            )}
          >
            {({ groupedTransactions }) => (
              <DashboardDisplayWindow title="Recent transactions">
                <TransactionsDisplayer
                  transactionList={groupedTransactions}
                  CurrencyIcon={availableCurrenciesState.SmallIcon}
                />
              </DashboardDisplayWindow>
            )}
          </SortedTransactions>
        </StyledOverview>
      )}
    </FilteredTransactionsContainer>
  );
};

export default DashboardOverview;
