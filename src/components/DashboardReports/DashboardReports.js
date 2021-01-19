import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux'

import Pagination from 'components/Pagination/Pagination';
import {Displayer} from 'components/TransactionsDisplayer/TransactionsDisplayer'


const Wrapper = styled.div`
  width: calc(100vw - 220px);
  margin: 20px 20px 20px 200px;
`;

const DisplayerWrapper = styled.div`
    width: 100%;
    padding: 20px;
    margin-bottom: 10px;
    background-color: white;


`
const DashboardReports = () => {
    const [TransactionsPerPage, setTransactionsPerPage] = useState(5);
    const [currentActivePage, setCurrentActivePage] = useState(1);
    const expenses = useSelector( state => state.expenses.expenses);
    const incomes = useSelector( state => state.incomes.incomes);
    const CurrencyIcon = useSelector( state => state.currencies.SmallIcon);

    const changeAmountOfPostsPerPage = amount => {
        setTransactionsPerPage(amount)
        setCurrentActivePage(1);
    };
    const changeActivePage = pageNumber => setCurrentActivePage(pageNumber);
    const moveToNextPage = () => setCurrentActivePage(currentActivePage+1);
    const moveToPreviousPage = () => setCurrentActivePage(currentActivePage-1);
    const indexOfLastTransaction = TransactionsPerPage * currentActivePage;
    const indexOfFirstTransaction = indexOfLastTransaction - TransactionsPerPage;
    const transactions = [].concat(expenses, incomes);
    const transactionsToBeDisplayed = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    return (
      <Wrapper>
        <DisplayerWrapper>
          <Displayer
            transactionList={transactionsToBeDisplayed}
            CurrencyIcon={CurrencyIcon}
            howManyItemsToBeDisplayed={TransactionsPerPage}
          />
        </DisplayerWrapper>
        <Pagination
          postsPerPage={TransactionsPerPage}
          currentActivePage={currentActivePage}
          totalPosts={transactions.length}
          handlePostsAmountChange={changeAmountOfPostsPerPage}
          changeActivePage={changeActivePage}
          moveToNextPage={moveToNextPage}
          moveToPreviousPage={moveToPreviousPage}
        />
      </Wrapper>
    );
};

DashboardReports.propTypes = {
    
};

export default DashboardReports;