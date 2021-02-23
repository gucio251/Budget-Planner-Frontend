import * as Yup from "yup";

const getLoginValidationSchema = (values, registeredUsers) => {
  return Yup.object().shape({
    email: Yup.string()
      .oneOf(registeredUsers, "E-mail shall be registered"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .matches(/[A-Z]/, "One uppercase character")
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, "One special character")
  });
}

const getRegistrationValidationSchema = (values, registeredUsers) => {
  return Yup.object().shape({
    email: Yup.string()
      .email("Valid email address")
      .notOneOf(registeredUsers, "Email shall be unique")
      .required('Must be filled'),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .matches(/[A-Z]/, "One uppercase character")
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, "One special character"),
    passwordConfirmation: Yup.string()
      .required('Must be filled')
      .test('password-match', 'Passwords must match', function(value){
        return this.parent.password === value;
      }),
  });
}

const selectedValueMsg = 'Value must be selected';

const getTransactionAdditionValidationSchema = (values) => {
  return Yup.object().shape({
    amount: Yup.number()
      .typeError("Value must be a number")
      .positive("Number must be positive"),
    currency_id: Yup.string()
      .required(selectedValueMsg),
    category: Yup.string()
      .required(selectedValueMsg),
    transaction_type_id: Yup.string()
      .required(selectedValueMsg),
    date: Yup.string()
      .required(selectedValueMsg)
  })
}

export const validations = {
  getLoginValidationSchema,
  getRegistrationValidationSchema,
  getTransactionAdditionValidationSchema,
};