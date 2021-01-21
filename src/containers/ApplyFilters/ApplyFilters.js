import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const ApplyFilters = ({children, transactions}) => {
    const filters = useSelector(state => state.filtration)

    return children({
        filteredTransactions: filter(transactions, filters)
    })
};


const filter = (transactions, filters) => {
    let filteredTransactions = transactions;

    if(filters.type !== "All"){
        filteredTransactions = filteredTransactions.filter(transaction => transaction.type === filters.type);
    }

    if(filters.category !=="All"){
        filteredTransactions = filteredTransactions.filter(transaction => transaction.category === filters.category);
    }

    if(filters.amountFrom !== null){
        filteredTransactions = filteredTransactions.filter(transaction => transaction.amount >= filters.amountFrom);
    }

    if (filters.amountTo !== null) {
        filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.amount < filters.amountTo
        );
    }

    return filteredTransactions;
}
ApplyFilters.propTypes = {
    
};

export default ApplyFilters;