import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const IncomeTypesContainer = ({children}) => {
    const [incomeCategories, setIncomeCategories] = useState([]);
    const incomeTypesState = useSelector(state => state.incomeTypes);

    useEffect(() => {
        if(incomeTypesState.loading === false){
            console.log(incomeTypesState.incomeTypes);
            setIncomeCategories(incomeTypesState.incomeTypes);
        }
    }, [incomeTypesState])

    return children({
        incomeCategories
    })
};

IncomeTypesContainer.propTypes = {
    children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default IncomeTypesContainer;