import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';

const TransactionFormContainer = ({values, children, touched, errors, categories}) => {
    const currencies = useSelector(state => state.currencies.currencies);
    const [subcategories, setSubcategories] = useState([]);
    const [subcategoryDisabled, setSubcategoryDisabled] = useState(true);
    const [formCorrectness, setFormCorrectness] = useState(false);

    useEffect(()=>{
        if (values.category !== '') {
        const [chosenCategory] = categories.filter(
            (category) => {
            return category.value === values.category;
            }
        );

        setSubcategories(chosenCategory.subcategories);
        setSubcategoryDisabled(false);
        }
    },[values.category])

    useEffect(() => {
        if (Object.keys(touched).length !== 0) {
        Object.keys(errors).length === 0 ? setFormCorrectness(true) : setFormCorrectness(false);
        }
    })

    return children({
      categories,
      subcategories,
      formCorrectness,
      subcategoryDisabled,
      currencies,
    });
};

export default TransactionFormContainer;