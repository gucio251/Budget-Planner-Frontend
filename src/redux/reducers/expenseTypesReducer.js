import {expenseTypesConstants} from './../actions/actionTypes';
import {expenseTypeSvgCorrelation} from 'Utils/svgCorrelation';

export const restructureInputData = (transactionTypes, relation) => {
  let categories = {};
  let subcategories = {};

  transactionTypes.forEach(transactionType => {
    const categoriesWithIcon = { ...transactionType.categories, Icon: relation[transactionType.categories.name]};
    categories[transactionType.categories.id] = categoriesWithIcon;
    subcategories = {
      ...subcategories,
      ...transactionType.subcategories
    }
  });

  return {
    categories,
    subcategories,
  }
}

export const getCategoryNameBySubcategoryId = (subcategoryId, transactionTypes) => {
  if (isNaN(subcategoryId)) return '';

  const categoryId = transactionTypes.subcategories[subcategoryId].category_id;
  const categoryName = transactionTypes.categories[categoryId].name;

  return categoryName;
}

export const getIconBySubcategoryId = (subcategoryId, transactionTypes) => {
    if (isNaN(subcategoryId)) return null;

    const categoryId = transactionTypes.subcategories[subcategoryId].category_id;
    const Icon = transactionTypes.categories[categoryId].Icon;

    return Icon;
}

const initialState = {
  status: 'idle',
  expenseTypes: {
    categories: {},
    subcategories: {}
  },
  error: false,
};

const expenseTypes = (state = initialState, {type, payload}) => {
  switch (type) {
    case expenseTypesConstants.GETEXPENSETYPES_REQUEST:
      return {
      ...state,
      status: 'loading'
      };
    case expenseTypesConstants.GETEXPENSETYPES_SUCCESS:
      const restructuredData = restructureInputData(
        payload,
        expenseTypeSvgCorrelation
      );
      return {
        ...state,
        status: 'succedded',
        expenseTypes: {
          ...restructuredData,
        },
      };
    case expenseTypesConstants.GETEXPENSETYPES_FAILURE:
      return {
        ...state,
        status: 'failed',
        errorMsg: payload
      };
    default:
      return state;
  }
}

export default expenseTypes;