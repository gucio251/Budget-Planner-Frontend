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
      .notOneOf(registeredUsers, "Email shall be unique"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .matches(/[A-Z]/, "One uppercase character")
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, "One special character"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
  });
}

export const validations = {
  getLoginValidationSchema,
  getRegistrationValidationSchema
}