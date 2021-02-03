import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector} from 'react-redux';

import {
  StyledOverview,
  Row,
  WelcomeText,
  StyledDateMenu,
  StyledDropdown,
  RowWithoutSpaceBetween,
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
