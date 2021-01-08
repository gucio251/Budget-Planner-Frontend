export const addSvg = (categories, correlationEl) => {
  return categories.map(category => {
    return {
      ...category,
      Icon: correlationEl[category.value]
    }
  })
};

export const filterTransactionsByDates = (transactions, datesRange) => {
  if(transactions.length === 0) return [];
  return transactions.filter(transaction => checkIfTransactionIsInsideGivenRange(transaction, datesRange))
}

export const checkIfTransactionIsInsideGivenRange = (transaction, datesRange) => {
    const convertedTransactionDate = convertToDateFormatFromString(
      transaction.transaction_date
    );
    const convertedStartDate = convertToDateFormatFromString(datesRange.start);
    const convertedFinishDate = convertToDateFormatFromString(datesRange.end);
    if (
      (convertedTransactionDate > convertedStartDate || areDatesEqual(convertedTransactionDate, convertedStartDate)) &&
      (convertedTransactionDate < convertedFinishDate || areDatesEqual(convertedTransactionDate, convertedFinishDate))
      ){
      return true;
    }else{
      return false;
    }
}

export const checkIfGivenDateIsHigherOrEqualToReference = (checkingDate, referenceDate) => {
  const convertedCheckingDate = convertToDateFormatFromString(checkingDate);
  const convertedReferenceDate = convertToDateFormatFromString(referenceDate);

  if(convertedCheckingDate > convertedReferenceDate || areDatesEqual(convertedCheckingDate, convertedReferenceDate)){
    return true;
  }else{
    return false;
  }
}

export const groupTransactionsByCategory = (transactions) => {
  return transactions.reduce((groupedData, transaction) => {
    switch(transaction.type){
      case 'expense':
        return {
            ...groupedData,
            expenses: addItemToGroupedTransactions(transaction, groupedData.expenses)
        };
      case 'income':
        return {
            ...groupedData,
            incomes: addItemToGroupedTransactions(transaction, groupedData.incomes)
        };
      default:
        return {
          ...groupedData
        }
    }
  }, {incomes: {}, expenses: {}});
};

const addItemToGroupedTransactions = (transaction, groupedTransactions) => {
  const { amount, category, Icon, type } = transaction;

  if (groupedTransactions.hasOwnProperty(category)) {
    return {
      ...groupedTransactions,
      [category]: {
        ...groupedTransactions[category],
        amount: groupedTransactions[category].amount + amount,
        howManyOccurences: groupedTransactions[category].howManyOccurences + 1,
      },
    };
  } else {
    return {
      ...groupedTransactions,
      [category]: {
        amount,
        howManyOccurences: 1,
        Icon,
        type,
      },
    };
  }
}

export const prepareDataForGraph = (transactionGroupedBy, graphColors, valueToBeShownName) => {
  const result = transactionGroupedBy.reduce((prevValue, currentTransaction) => {
    const {name} = currentTransaction;
    return {
      ...prevValue,
      labels: [].concat(prevValue.labels, name),
      datasets: [{
        backgroundColor: [].concat(prevValue.datasets[0].backgroundColor, graphColors[name].base),
        hoverBackgroundColor: [].concat(prevValue.datasets[0].hoverBackgroundColor, graphColors[name].hovered),
        data: [].concat(prevValue.datasets[0].data, currentTransaction[valueToBeShownName]),
        }]
    };
  }, {labels: [], datasets: [{backgroundColor: [], hoverBackgroundColor: [], data: []}]})

  return result;
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
    return { ...obj[propertyName], name: propertyName};
  });
}

const compareByProperty = (propertyName) => (a,b) => {
      if (a[propertyName] > b[propertyName]) {
        return -1;
      }
      if (a[propertyName] < b[propertyName]) {
        return 1;
      }
      return 0;
}

export const sortTransactionsByChosenProperty = (object, propertyName) => {
    const arr = convertObjectOfObjectsToArrayOfObjects(object);
    arr.sort(compareByProperty(propertyName));
    return arr;
}

export const recalculateTransactionsForActiveCurrency = ({
  transactions,
  currencies,
}) => {
  if (transactions.length === 0) return [];
  return transactions.map((transaction) => {
    if (transaction.currency === currencies.active) {
      return transaction;
    } else {
      const calculatedAmount = transaction.amount *
        (currencies.rates[currencies.active] /
          currencies.rates[transaction.currency]);
      return {
        ...transaction,
        currency: currencies.active,
        amount: calculatedAmount,
      };
    }
  });
};

export const convertDate = (transactionDate) => {
     switch (howManyDaysBeforeToday(transactionDate)) {
       case 0:
         return 'Today'
        case 1:
          return 'Yesterday'
        default:
          const dateToConversion = new Date(transactionDate);
          return `${dateToConversion.getDate()}.${dateToConversion.getMonth()+1}`
     }
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
  return `${todaysDate.getFullYear()}-${todaysDate.getMonth() +1}-${todaysDate.getDate()}`
}
