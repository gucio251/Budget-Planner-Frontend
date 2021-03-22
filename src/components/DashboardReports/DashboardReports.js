import React, {useState} from 'react';
import styled from 'styled-components';

import ApplyFilters from 'containers/ApplyFilters/ApplyFilters'
import FiltersSection from 'components/FiltersSection/FiltersSection'
import Pagination from 'components/Pagination/Pagination';
import {Displayer} from 'components/TransactionsDisplayer/TransactionsDisplayer'
import FilteredTransactionsContainer from 'containers/FilteredTransactionsContainer/FilteredTransactionsContainer';
import SortedTransactions from 'containers/SortedTransactions/SortedTransactions';


const Wrapper = styled.div`
  margin: 20px 20px 20px 200px;

  ${({theme}) => theme.devices.tablet}{
     margin: 20px 20px 20px 120px;
  }

  ${({theme}) => theme.devices.mobile}{
    margin: 20px 0 0 0;
  }
`;

const DisplayerWrapper = styled.div`
    width: 100%;
    padding: 20px;
    margin-bottom: 10px;
    background-color: white;


`
const DashboardReports = () => {
    const [transactionsPerPage, setTransactionsPerPage] = useState(5);
    const [currentActivePage, setCurrentActivePage] = useState(1);

    const changeAmountOfPostsPerPage = amount => {
        setTransactionsPerPage(parseInt(amount))
        setCurrentActivePage(1);
    };
    const changeActivePage = pageNumber => setCurrentActivePage(pageNumber);
    const moveToNextPage = () => setCurrentActivePage(currentActivePage+1);
    const moveToPreviousPage = () => setCurrentActivePage(currentActivePage-1);
    const indexOfLastTransaction = transactionsPerPage * currentActivePage;
    const indexOfFirstTransaction = indexOfLastTransaction -transactionsPerPage;

    return (
      <Wrapper>
        <FiltersSection />
        <FilteredTransactionsContainer>
          {({
            recalculatedExpenses,
            recalculatedIncomes,
            availableCurrenciesState,
          }) => (
            <ApplyFilters
              transactions={[].concat(
                recalculatedExpenses,
                recalculatedIncomes
              )}
            >
              {({ filteredTransactions }) => (
                <SortedTransactions
                  allTransactions={filteredTransactions}
                  indexOfFirstTransaction={indexOfFirstTransaction}
                  transactionsPerPage={transactionsPerPage}
                >
                  {({ groupedTransactions }) => (
                    <>
                      <DisplayerWrapper>
                        <Displayer
                          transactionList={groupedTransactions}
                          CurrencyIcon={availableCurrenciesState.SmallIcon}
                          withDeletion={true}
                        />
                      </DisplayerWrapper>
                      <Pagination
                        postsPerPage={transactionsPerPage}
                        currentActivePage={currentActivePage}
                        totalPosts={filteredTransactions.length}
                        handlePostsAmountChange={changeAmountOfPostsPerPage}
                        changeActivePage={changeActivePage}
                        moveToNextPage={moveToNextPage}
                        moveToPreviousPage={moveToPreviousPage}
                      />
                    </>
                  )}
                </SortedTransactions>
              )}
            </ApplyFilters>
          )}
        </FilteredTransactionsContainer>
      </Wrapper>
    );
};

export default DashboardReports;