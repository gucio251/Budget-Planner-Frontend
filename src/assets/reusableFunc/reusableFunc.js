const isLetter = sign => {
    const letters = /^[A-Za-z]+$/;
    return letters.test(sign);
}

const isUpperCase = letter => letter === letter.toUpperCase() ? true : false;

export const reusableFunctions = {
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
    return result.length !== 0 ? true : false;
  },

  containsUppercases({ valueToBeValidated }) {
    const upperCaseLetters = valueToBeValidated
      .split("")
      .filter(isLetter)
      .filter(isUpperCase);
    return upperCaseLetters.length === 0 ? false : true;
  },

  areEqual({ valueToBeValidated, repeatedPassword }) {
    return valueToBeValidated === ""
      ? false
      : valueToBeValidated === repeatedPassword
      ? true
      : false;
  },

  validateEmail({ valueToBeValidated }) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(valueToBeValidated).toLowerCase());
  },
};
