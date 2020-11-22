export const addSvg = (categories, correlationEl) => {
  return categories.map(category => {
    return {
      ...category,
      Icon: correlationEl[category.value]
    }
  })
};

export const filterTransactionsByDates = (transactions, datesRange) => {
  return transactions.filter(transaction => {
    const convertedTransactionDate = convertToDateFormatFromString(
      transaction.transaction_date
    );
    const convertedStartDate = convertToDateFormatFromString(datesRange.start);
    const convertedFinishDate = convertToDateFormatFromString(datesRange.end);
    if (
      (convertedTransactionDate > convertedStartDate || areDatesEqual(convertedTransactionDate, convertedStartDate)) &&
      (convertedTransactionDate < convertedFinishDate || areDatesEqual(convertedTransactionDate, convertedFinishDate))
      ){
      return transaction;
    }
  })
}

const convertToDateFormatFromString = (dateAsString, delimiter="-") => {
  const [year, month, day] = dateAsString.split(delimiter);
  return new Date(year, month - 1 , day);
}

const areDatesEqual = (d1, d2) => {
  return d1.getTime() === d2.getTime();
}

export const convertDateToString = (date) => {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

const convertObjectOfObjectsToArrayOfObjects = (obj) => {
  return Object.keys(obj).map((propertyName) => {
    return { ...obj[propertyName]};
  });
}

const compareByProperty = (propertyName) => (a,b) => {
      if (a[propertyName] < b[propertyName]) {
        return -1;
      }
      if (a[propertyName] > b[propertyName]) {
        return 1;
      }
      return 0;
}

export const sortTransactionsByChosenProperty = (object, propertyName) => {
    const arr = convertObjectOfObjectsToArrayOfObjects(object);
    arr.sort(compareByProperty(propertyName));
    return arr;
}

export const convertDate = (transactions) => {
   return transactions.map(transaction => {
     switch (howManyDaysBeforeToday(transaction.transaction_date)) {
       case 0:
         return {
           ...transaction,
           transaction_date_converted: 'Today'
         };
        case 1:
          return {
            ...transaction,
            transaction_date_converted: 'Yestarday',
          };
        default:
          const dateToConversion =  new Date(transaction.transaction_date);
          return{
            ...transaction,
            transaction_date_converted: `${dateToConversion.getDate()}.${dateToConversion.getMonth()+1}`
          }
     }
   })
}

const howManyDaysBeforeToday = (someDate) => {
  const today = new Date();
  const referenceDay = new Date(someDate);

  return parseInt(today.getDate()) - parseInt(referenceDay.getDate());
}

const returnSvg = (transactionName, correlation) => correlation[transactionName];

const addSvgToObjectAsIcon = (Svg, transactionObject) => {
  return {...transactionObject, Icon:Svg}
}

const addSvgToTransaction = (transactionObject, keyNameForSvg, correlation) => {
  const Svg = returnSvg(transactionObject[keyNameForSvg], correlation);
  return addSvgToObjectAsIcon(Svg, transactionObject);
}

export const handleSvgAddition = (transactionsList, keyNameForSvg, correlation) => {
  if(Array.isArray(transactionsList)){
    return transactionsList.map(transaction => {
      return addSvgToTransaction(transaction, keyNameForSvg, correlation);
    });
  }else{
    return addSvgToTransaction(transactionsList, keyNameForSvg, correlation);
  }
}

const addPropertyToAnObject = (propertyName, value, obj) => {
  return {...obj, [propertyName]: value};
}

export const addPropertyLoListOfObjects = (propertyName, value, listOfObjects) => {
  return listOfObjects.map(obj => addPropertyToAnObject(propertyName, value, obj));
}

export const getTodaysDate = () => {
  const todaysDate = new Date();
  return {
    day: todaysDate.getDate(),
    month: todaysDate.getMonth() +1,
    year: todaysDate.getFullYear()
  };
}
