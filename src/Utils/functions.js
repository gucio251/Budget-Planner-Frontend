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
    const [year, month, day] = transaction.transaction_date.split("-");
    const transactionDate = new Date(year, month-1, day);
    if(transactionDate >= datesRange.start && transactionDate <= datesRange.end){
      return transaction;
    }
  })
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
           transaction_date: 'Today'
         };
        case 1:
          return {
            ...transaction,
            transaction_date: 'Yestarday',
          };
        default:
          const [year, month, day] = transaction.transaction_date.split("-");
          return{
            ...transaction,
            transaction_date: `${day}.${month}`
          }
     }
   })
}

const howManyDaysBeforeToday = (someDate) => {
  const today = new Date();
  const [year, month, day] = someDate.split("-");

  return parseInt(today.getDate()) - parseInt(day);
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
  return `${todaysDate.getDate()}/${todaysDate.getMonth()+1}/${todaysDate.getFullYear()}`;
}


export const transformToString = (date) => {
  if (typeof date !== 'string') {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return date;
};