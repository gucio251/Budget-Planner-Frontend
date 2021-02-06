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
import DashboardDateMenu from 'components/DashboardDateMenu/DashboardDateMenu';
import DashboardDisplayWindow from 'components/DashboardDisplayWindow/DashboardDisplayWindow';
import GraphAndStatsGroupedByType from 'components/GraphAndStatsGroupedByType/GraphAndStatsGroupedByType';
import TransactionsDisplayer from 'components/TransactionsDisplayer/TransactionsDisplayer';
import CustomDropdownDashboard from 'components/UI/Dropdown';
import {currencyActions} from 'redux/actions/currencyActions'
import FilteredTransactionsContainer from 'containers/FilteredTransactionsContainer/FilteredTransactionsContainer';
import SortedTransactions from 'containers/SortedTransactions/SortedTransactions';

const DashboardOverview = () => {
  const login = useSelector(state => state.login.login);
  const dispatch=useDispatch();
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
                <CustomDropdownDashboard
                  list={availableCurrenciesState.currencies}
                  onChange={(value) =>
                    dispatch(currencyActions.changeActiveCurrency(value.value))
                  }
                  indexOfDefaultValue={availableCurrenciesState.currencies.findIndex(
                    (currency) =>
                      currency.value === availableCurrenciesState.active
                  )}
                  isSearchable={true}
                  name="currencies"
                />
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
            expenses={recalculatedExpenses}
            incomes={recalculatedIncomes}
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
