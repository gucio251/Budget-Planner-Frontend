import {reusableFunctions} from './../../assets/reusableFunc/reusableFunc'

const emailValidationNamesToDisplay = {
  existence: "Email shall be registered"
};

const passwordValidationNamesToDisplay = {
  length: "Minimum 8 characters",
  specialSigns: "One special character",
  capitalLetters: "One uppercase character",
};

export const emailLoginValidation = {
  validity: {
    displayValue: emailValidationNamesToDisplay.existence,
    validationFn: reusableFunctions.isInArray,
    expectedValue: true,
  }
};

export const passwordLoginValidation = {
  length: {
    displayValue: passwordValidationNamesToDisplay.length,
    validationFn: reusableFunctions.lengthValidation,
    expectedValue: true,
  },
  specialSigns: {
    displayValue: passwordValidationNamesToDisplay.specialSigns,
    validationFn: reusableFunctions.regExp,
    expectedValue: true,
  },
  lowerAndUpperSigns: {
    displayValue: passwordValidationNamesToDisplay.capitalLetters,
    validationFn: reusableFunctions.containsUppercases,
    expectedValue: true,
  },
};
