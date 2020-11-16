import { validations } from 'components/validationSchemas-yup/validationSchemas-yup';
import { routes } from 'routes';

const names = {
    email: "email",
    password: "password",
    passwordConfirmation: "passwordConfirmation"
};

const labels = {
    email: "E-mail address",
    password: "Password",
    passwordConfirmation: "Confirm Password"
};

const types = {
    password: "password",
    text: "text"
};

const formInformation = [
    {
        name: names.email,
        label: labels.email,
        type: types.text,
    },
    {
        name: names.password,
        label: labels.password,
        type: types.password,
    },
    {
        name: names.passwordConfirmation,
        label: labels.passwordConfirmation,
        type: types.password,
    }
];

export const formSettings = {
  linkData: {
    text: 'Already have an account?',
    linkText: 'Log in',
    href: routes.loginPage,
  },
  buttonName: 'Sign up',
  initialValues: { email: '', password: '', passwordConfirmation: ''},
  inputFieldsInformation: formInformation,
  animatedInfoSide: true,
  animatedInputSide: true,
  header: 'Create an account to start tracking your budget',
  validationSchema: validations.getRegistrationValidationSchema,
};