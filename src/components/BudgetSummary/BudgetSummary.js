import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ReactComponent as BilanceIcon} from 'assets/icons/balanceDashboardIcon.svg';
import { ReactComponent as IncomeIcon } from 'assets/icons/incomeDashboardIcon.svg';
import { ReactComponent as SavingsIcon } from 'assets/icons/savingsDashboardIcon.svg';
import { ReactComponent as ExpensesIcon } from 'assets/icons/expensesDashboardIcon.svg';

import SingleSummaryField from 'components/UI/SingleSummaryField'

const Wrapper = styled.div`
    width: 96%;
    height: 100%;
    display: flex;
    flex-flow: column;
    gap: 21px;
`

const Row = styled.div`
    display: flex;
    flex-flow: row;
    gap: 21px;
`

const BudgetSummary = props => {
    return (
      <Wrapper>
        <Row>
          <SingleSummaryField
            Svg={BilanceIcon}
            amount="+$1.800"
            name="Balance"
          />
          <SingleSummaryField Svg={IncomeIcon} amount="+$3.800" name="Income" />
        </Row>
        <Row>
          <SingleSummaryField
            Svg={SavingsIcon}
            amount="+$1.000"
            name="Savings"
          />
          <SingleSummaryField
            Svg={ExpensesIcon}
            amount="-$2.800"
            name="Expenses"
          />
        </Row>
      </Wrapper>
    );
};

BudgetSummary.propTypes = {
    
};

export default BudgetSummary;