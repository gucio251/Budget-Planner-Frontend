export const validationManager = {
  validations: {},
  fieldNameValidationNameDependency: {},

  validate(inputFieldName, value) {
    const validationName = this.fieldNameValidationNameDependency[inputFieldName];
    const key = this.fieldNameValidationNameDependency[inputFieldName];
    return {[key]: this.performSingleValidation(this.validations[validationName], value)};
  },

  setValidations(validations) {
    this.validations = { ...validations };
  },

  setDependencies(dependencyObj) {
    this.fieldNameValidationNameDependency = { ...dependencyObj };
  },

  configureInitialSetup(validations, dependencyObj){
    this.setValidations(validations);
    this.setDependencies(dependencyObj);
  },

  performSingleValidation(validation, valueToBeValidated) {
    const validationsForField = Object.keys(validation);
    let validationsStatuses = [];
    let fieldCorrectness;

    let validationResult = validationsForField.map((singleValidation) => {
      const validationResult = validation[singleValidation].validationFn(valueToBeValidated);
      const expectedValidationResult = validation[singleValidation].expectedValue;

      if(validationResult === expectedValidationResult){
        validationsStatuses.push(true);
        return { ...validation[singleValidation], correctness: true };
      }else{
        validationsStatuses.push(false);
        return { ...validation[singleValidation], correctness: false };
      }
    });

    fieldCorrectness = validationsStatuses.every((val) => val === true);
    validationResult = {
      ...validationResult,
      ["fieldCorrectness"]: fieldCorrectness,
    };

    return validationResult;
  },

  performAllValidations(valuesToBeValidated){
    const fieldNames = valuesToBeValidated.map(({fieldName}) => fieldName);
    const values = valuesToBeValidated.map(valueToBeValidated => {
      const {fieldName, ...rest } = valueToBeValidated;
      return rest;
    });

    const results = fieldNames.map((fieldName, i) => {
      return this.validate(fieldName, values[i]);
    })

    return results;
  }
};
