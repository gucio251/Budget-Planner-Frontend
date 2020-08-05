import {reusableFunctions} from './../../assets/reusableFunc/reusableFunc';

const emailValidationNamesToDisplay = {
  validity: "Valid email address",
  uniqueness: "Email shall be unique",
};

const passwordValidationNamesToDisplay = {
  length: "Minimum 8 characters",
  specialSigns: "One special character",
  capitalLetters: "One uppercase character",
};

const repeatedPasswordNamesToDisplay = {
  equality: "repeated exactly"
}

export const emailValidation = {
  validity: {
    displayValue: emailValidationNamesToDisplay.validity,
    validationFn: reusableFunctions.validateEmail,
    expectedValue: true,
  },
  emailUniquenness: {
    displayValue: emailValidationNamesToDisplay.uniqueness,
    validationFn: reusableFunctions.isInArray,
    expectedValue: false
  }
};

export const passwordValidation = {
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
    expectedValue: true
  }
};

export const repeatedPasswordValidation = {
  passwordsEquality: {
    displayValue: repeatedPasswordNamesToDisplay.equality,
    validationFn: reusableFunctions.areEqual,
    expectedValue: true
  }
}
