import React from 'react';
import { PropTypes } from 'prop-types';

import {
  StyledOverview,
  WelcomeText,
  EmptyDiv,
  StyledDateMenu,
  StyledDropdown,
  StyledBudgetSummary,
  StyledGraphArea,
  StyledAllTransactions,
} from './DashboardOverview.styled';

import BudgetSummary from 'containers/BudgetSummary/BudgetSummary';
import DashboardDateMenu from 'components/DashboardDateMenu/DashboardDateMenu';
import DashboardDisplayWindow from 'components/DashboardDisplayWindow/DashboardDisplayWindow';
import GraphAndStatsGroupedByType from 'components/GraphAndStatsGroupedByType/GraphAndStatsGroupedByType';
import TransactionsDisplayer from 'components/TransactionsDisplayer/TransactionsDisplayer';
import CustomDropdownDashboard from 'components/UI/Dropdown';
import {currencyActions} from 'redux/actions/currencyActions'

import FilteredTransactionsContainer from 'containers/FilteredTransactionsContainer/FilteredTransactionsContainer';
import {useDispatch} from 'react-redux';

const DashboardOverview = () => {
  const dispatch=useDispatch();
  return (
    <FilteredTransactionsContainer>
      {({
        recalculatedExpenses,
        recalculatedIncomes,
        availableCurrenciesState,
      }) => (
        <StyledOverview>
          <WelcomeText>Hi Caroline, welcome back!</WelcomeText>
          <StyledDateMenu>
            <StyledDropdown>
              <CustomDropdownDashboard
                list={availableCurrenciesState.currencies}
                onChange={(value) =>
                  dispatch(currencyActions.changeActiveCurrency(value.value))
                }
                indexOfDefaultValue={availableCurrenciesState.currencies.findIndex(
                  currency =>  currency.value === availableCurrenciesState.active
                )}
                isSearchable={true}
                name="currencies"
              />
            </StyledDropdown>
            <DashboardDateMenu />
          </StyledDateMenu>
          <StyledBudgetSummary>
            <BudgetSummary
              expenses={recalculatedExpenses}
              incomes={recalculatedIncomes}
              Icon={availableCurrenciesState.Icon}
            />
          </StyledBudgetSummary>
          <StyledGraphArea>
            <DashboardDisplayWindow title="Expenses/incomes">
              <GraphAndStatsGroupedByType
                expenses={recalculatedExpenses}
                incomes={recalculatedIncomes}
              />
            </DashboardDisplayWindow>
          </StyledGraphArea>
          <StyledAllTransactions>
            <DashboardDisplayWindow title="Recent transactions">
              <TransactionsDisplayer
                expenses={recalculatedExpenses}
                incomes={recalculatedIncomes}
                CurrencyIcon={availableCurrenciesState.SmallIcon}
              />
            </DashboardDisplayWindow>
          </StyledAllTransactions>
        </StyledOverview>
      )}
    </FilteredTransactionsContainer>
  );
};

DashboardOverview.propTypes = {
  handleDatePeriodChange: PropTypes.func.isRequired,
};

export default DashboardOverview;
