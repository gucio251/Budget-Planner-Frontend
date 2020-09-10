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

function getErrorsFromValidationError(validationError) {
    const FIRST_ERROR = 0;
    return  validationError.inner.reduce((results, error) => {
        const found = results.find(a=> a.name === error.path);
        const value = error.errors[FIRST_ERROR];

        typeof(found) === 'undefined' ? results.push({name: error.path, errorMsgs: [value]}) : found.errorMsgs.push(value);

        return results;
    }, []);
}