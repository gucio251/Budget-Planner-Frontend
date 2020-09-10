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

const registrationEmailErrorMsgs = [
    "Email shall be unique",
    "Valid email address"
];

const registrationPasswordErrorMsgs = [
    "Minimum 8 characters",
    "One uppercase character",
    "One special character"
];

const registrationConfirmedPasswordErrorMsgs = [
    "Passwords must match"
]

const formInformation = [
    {
        name: names.email,
        label: labels.email,
        type: types.text,
        errorMsgs: registrationEmailErrorMsgs
    },
    {
        name: names.password,
        label: labels.password,
        type: types.password,
        errorMsgs: registrationPasswordErrorMsgs
    },
    {
        name: names.passwordConfirmation,
        label: labels.passwordConfirmation,
        type: types.text,
        errorMsgs: registrationConfirmedPasswordErrorMsgs
    }
];


export const registrationData = {
    formInformation,
};