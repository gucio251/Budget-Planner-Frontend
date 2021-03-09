import { filtrationConstants } from 'redux/actions/actionTypes';

const setTransactionTypeFilter = transactionType => {
    return {
        type: filtrationConstants.SETTRANSACTIONTYPEFILTER,
        payload: transactionType
    }
}

const setCategoryFilter = categoryType => {
  return {
    type: filtrationConstants.SETCATEGORYFILTER,
    payload: categoryType,
  };
};

const setSubcategoryFilter = subcategoryType => {
  return {
    type: filtrationConstants.SETSUBCATEGORYFILTER,
    payload: subcategoryType,
  };
};

const setAmountFromFilter = amountFrom => {
  return {
    type: filtrationConstants.SETAMOUNTFROMFILTER,
    payload: amountFrom
  }
}

const setAmountToFilter = amountTo => {
  return {
    type: filtrationConstants.SETAMOUNTTOFILTER,
    payload: amountTo,
  };
};

const setCommentFilter = comment => {
  return {
    type: filtrationConstants.SETCOMMENTFILTER,
    payload: comment,
  };
};

export const filtrationActions = {
  setTransactionTypeFilter,
  setCategoryFilter,
  setSubcategoryFilter,
  setAmountFromFilter,
  setAmountToFilter,
  setCommentFilter,
};