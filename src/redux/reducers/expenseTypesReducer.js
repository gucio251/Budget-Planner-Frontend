import {expenseTypesConstants} from './../actions/actionTypes';
import {expenseTypeSvgCorrelation} from 'Utils/svgCorrelation';
import { normalize, schema } from 'normalizr';

const subcategory = new schema.Entity('subcategories', {});
const category = new schema.Entity('categories', {
  subcategories: [subcategory],
}, {idAttribute: 'value'})

export const normalizePack = { category, subcategory};

export const addSvgToData = (data, dependencies) => {
  return Object.keys(
        data.entities.categories
      ).reduce((finalResult, categoryName) => {
        return {
          ...finalResult,
          [categoryName]: {
            ...data.entities.categories[categoryName],
            Icon: dependencies[categoryName]
          }
        }
      }, {});
}

const expenseTypes = (state = {}, {type, payload}) => {
  switch (type) {
    case expenseTypesConstants.GETEXPENSETYPES_REQUEST:
      return {
      ...state,
      loading: true
      };
    case expenseTypesConstants.GETEXPENSETYPES_SUCCESS:
      const normalizedData = normalize({categories: payload}, { categories: [normalizePack.category]});
      const normalizedCategoriesWithSvg = addSvgToData(normalizedData, expenseTypeSvgCorrelation);
      return {
        ...state,
        loading: false,
        expenseTypes: {
          ...normalizedData.entities,
          categories: normalizedCategoriesWithSvg,
        },
      };
    case expenseTypesConstants.GETEXPENSETYPES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: payload
      };
    default:
      return state;
  }
}

export default expenseTypes;