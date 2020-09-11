import { validations } from "components/validationSchemas-yup/validationSchemas-yup";
import { routes } from "routes"

const names = {
  email: "email",
  password: "password"
};

const labels = {
  email: "E-mail address",
  password: "Password"
};

const types = {
  password: "password",
  text: "text"
};

const loginEmailErrorMsgs = [
  "E-mail shall be registered"
];

const loginPasswordErrorMsgs = [
  "Minimum 8 characters",
  "One uppercase character",
  "One special character"
];

const formInformation = [
  {
    name: names.email,
    label: labels.email,
    type: types.text,
    errorMsgs: loginEmailErrorMsgs
  },
  {
    name: names.password,
    label: labels.password,
    type: types.password,
    errorMsgs: loginPasswordErrorMsgs
  },
];

export const formSettings = {
  linkData: { text: "Don't have an account?", linkText: "Sign up", href: routes.registrationPage },
  buttonName: "Log in",
  initialValues: { email: "", password: "" },
  inputFieldsInformation: formInformation,
  animatedInfoSide: false,
  animatedInputSide: false,
  header: "Welcome again!",
  validationSchema: validations.getLoginValidationSchema
}