export const validationManager = {
  validations: {},
  fieldNameValidationNameDependency: {},
  func: {},

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

  configureInitialSetup(validations, dependencyObj, objectPrepFunc){
    this.setValidations(validations);
    this.setDependencies(dependencyObj);
    this.func = objectPrepFunc;
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
  },

  getValuesFromNestedObjects(obj, keyName){
    return Object.keys(obj).map((objProp) => obj[objProp][keyName]);
  },

  checkIfAllFieldsAreCorrect(fieldsStatuses){
    return fieldsStatuses.every((val) => val === true);
  },

  submitForm(objectToBeValidated, validationNames){
    const temp = { ...objectToBeValidated };
    delete temp.lastModifiedField;

    const dataForValidation = Object.keys(temp).map((fieldName) => {
      const valueToBeValidated = this.func(
        validationNames[fieldName]
      );
      valueToBeValidated.fieldName = fieldName;
      return valueToBeValidated;
    });

    const validationsArray = this.performAllValidations(dataForValidation);

    const finalResult = Object.assign(...validationsArray);

    const inputFieldsStates = this.getValuesFromNestedObjects(finalResult, "fieldCorrectness");

    const isFormCorrect = this.checkIfAllFieldsAreCorrect(inputFieldsStates);

    return [finalResult, isFormCorrect];
  }
};
