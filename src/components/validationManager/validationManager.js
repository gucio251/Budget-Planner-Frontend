export const validationManager = {
  validations: {},
  fieldNameValidationNameDependency: {},
  fieldCorrectness: false,
  validate(inputFieldName, value) {
    const validationName = this.fieldNameValidationNameDependency[
      inputFieldName
    ];
    return this.performValidation(this.validations[validationName], value);
  },
  setValidations(validations) {
    this.validations = { ...validations };
  },

  setDependencies(dependencyObj) {
    this.fieldNameValidationNameDependency = { ...dependencyObj };
  },

  calculateFieldCorrectness(validation) {
    const allValidationsStatuses = Object.keys(validation).map(
      (singleValidation) => validation[singleValidation].correctness
    );
    this.fieldCorrectness = allValidationsStatuses.every((val) => val === true);
  },

  performValidation(validation, valueToBeValidated) {
    //spróbować na ifach
    let validationResult = Object.keys(validation).map(
      (specificValidationSet) => {
        return validation[specificValidationSet].validationFn(
          valueToBeValidated
        ) === validation[specificValidationSet].expectedValue
          ? { ...validation[specificValidationSet], correctness: true }
          : { ...validation[specificValidationSet], correctness: false };
      }
    );

    this.calculateFieldCorrectness(validationResult);
    validationResult = {
      ...validationResult,
      ["fieldCorrectness"]: this.fieldCorrectness,
    };
    return validationResult;
  },
};



/* const ValidationManager = (customValidations, dependencies, inputFieldName, inputFieldValue) => {
  const [validations, setValidations] = useState(customValidations);
  const [fieldNameValidationNameDependency, setFieldNameValidationNameDependency] = useState(dependencies);

  const validate = () => {
    const validationName = fieldNameValidationNameDependency[inputFieldName];
    return performValidation(validations[validationName], inputFieldValue)
  }

  const performValidation = (validation, valueToBeValidated) => {
    console.log(validation)
  }
  return ("dsa");
};

export default ValidationManager; */