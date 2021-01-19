import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux'

import TransactionsDisplayer from 'components/TransactionsDisplayer/TransactionsDisplayer'


const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`
const DashboardReports = props => {
    const expenses = useSelector( state => state.expenses.expenses);
    const incomes = useSelector( state => state.incomes.incomes);
    const CurrencyIcon = useSelector( state => state.currencies.SmallIcon);
    debugger;
    return (
      <Wrapper>
        <TransactionsDisplayer
          expenses={expenses}
          incomes={incomes}
          CurrencyIcon={CurrencyIcon}
          howManyItemsToBeDisplayed={6}
        />
      </Wrapper>
    );
};

DashboardReports.propTypes = {
    
};

export default DashboardReports;