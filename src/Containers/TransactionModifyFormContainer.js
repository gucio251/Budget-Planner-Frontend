import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TransactionModifyFormContainer = ({
  values,
  children,
  errors,
  categories,
}) => {
  const currencies = useSelector((state) => state.currencies.currencies);
  const [valuesBeforeModification, setValuesBeforeModification] = useState([])
  const [valuesModified, setValuesModified] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryDisabled, setSubcategoryDisabled] = useState(true);
  const [formCorrectness, setFormCorrectness] = useState(false);

const arrayEquals = (a, b) => {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  useEffect(() => {
    if (values.category !== '') {
      const [chosenCategory] = categories.filter((category) => {
        return category.value === values.category;
      });
      setSubcategories(chosenCategory.subcategories);
      setSubcategoryDisabled(false);
    }
  }, [values.category]);

  useEffect(() => {
    const {amount, category_id, currency_id, transaction_date, comments} = values;
    let currentValuesArray = [amount, category_id, currency_id, transaction_date, comments];
    if(valuesBeforeModification.length === 0){
      setValuesBeforeModification(currentValuesArray);
    }else{
      setValuesModified(
        !arrayEquals(currentValuesArray, valuesBeforeModification)
      );
    }
  },[values])

  useEffect(() => {
      Object.keys(errors).length === 0 && valuesModified
        ? setFormCorrectness(true)
        : setFormCorrectness(false);
  }, [valuesModified, errors]);

  return children({
    categories,
    subcategories,
    formCorrectness,
    subcategoryDisabled,
    currencies,
  });
};

export default TransactionModifyFormContainer;
