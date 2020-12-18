export default function validate(getValidationSchema, arrayOfUsers){
    return (values) => {
        const validationSchema = getValidationSchema(values, arrayOfUsers);
        try {
          validationSchema.validateSync(values, { abortEarly: false });
          return {}
        } catch (error) {
          return getErrorsFromValidationError(error);
        }
    }
}

const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0;

    return  validationError.inner.reduce((result, error) => {
        const fieldName = error.path;
        if(checkIfObjectIsEmpty(result)|| !checkIfOjectHasPropertyAlready(result, fieldName)){
          return {
            ...result,
            [fieldName]: [error.errors[FIRST_ERROR]],
          };
        }else{
          return {
            ...result,
            [fieldName]: [].concat(result[fieldName], error.errors[FIRST_ERROR])
          }
        }
    }, {});
}

const checkIfObjectIsEmpty = (obj) => {
  return Object.keys(obj).length === 0 ? true : false;
}

const checkIfOjectHasPropertyAlready = (obj, property) => {
  return obj.hasOwnProperty(property) ? true : false;
}