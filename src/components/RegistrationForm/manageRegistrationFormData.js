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

const isLetter = sign => {
    const letters = /^[A-Za-z]+$/;
    return letters.test(sign);
}

const isUpperCase = letter => letter === letter.toUpperCase() ? true : false

const reusableFunctions = {
  lengthValidation({ valueToBeValidated }) {
    return valueToBeValidated.length >= 8 ? true : false;
  },
  regExp({ valueToBeValidated }) {
    const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    return valueToBeValidated.length === 0
      ? null
      : regex.test(valueToBeValidated);
  },

  isInArray({ valueToBeValidated, arr }) {
    const result = arr.filter((arrItem) => arrItem === valueToBeValidated);
    return result.length !== 0 || !valueToBeValidated ? true : false;
  },

  containsUppercases({ valueToBeValidated }) {
    const upperCaseLetters = valueToBeValidated
      .split("")
      .filter(isLetter)
      .filter(isUpperCase);
    return upperCaseLetters.length === 0 ? false : true;
  },

  areEqual({ valueToBeValidated, repeatedPassword }) {
    return valueToBeValidated === "" ? false : valueToBeValidated === repeatedPassword ? true : false;
  },

  validateEmail({ valueToBeValidated }) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(valueToBeValidated).toLowerCase());
  },
};

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
