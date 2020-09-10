import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import styled from "styled-components";
import AppInfoSide from "components/AppInfoSide/AppInfoSide";
import FormInputSide from "components/FormInputSide/FormInputSide";
import { userActions } from "redux/actions/userActions";
import { registrationData } from "./registrationFormData"
import { validations } from "components/validationSchemas-yup/validationSchemas-yup";

const FormStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  ${({ theme }) => theme.devices.tablet} {
    display: block;
    flex-direction: column;
    overflow-y: auto;
  }

  ${({ theme }) => theme.devices.mobile} {
    height: 100vh;
    display: flex;
    flex-direction: row;
    overflow-y: hidden;
  }
`;

const linkData = { text: "Already have an account?", linkText: "Log in", href: routes.loginPage };
const buttonName = "Sign up";

const RegistrationForm = () => {
    const initialValues = {
        email: "",
        password: "",
        passwordConfirmation: "",
    };

    const dispatch = useDispatch();
    const history = useHistory();

    const registeredUsers = useSelector(state => state.users);
    const [displayInfoSide, setDisplayInfoSide] = useState(true)
    const [emails, setEmails] = useState([]);
    const [errorMsgFromValidation, setErrorMsgFromValidation] = useState("");

    const handleFormSubmit = (values) => {
        dispatch(userActions.addUser(values, history))
    }

    useEffect(() => {
        const loadingDataFinished = registeredUsers.hasOwnProperty("emails") || registeredUsers.hasOwnProperty("errorMsg");

        const action = !loadingDataFinished ? dispatch(userActions.loadUsers()) :
            registeredUsers.hasOwnProperty("emails") ? setEmails(registeredUsers.emails) :
                registeredUsers.hasOwnProperty("errorMsg") ? setErrorMsgFromValidation({ msg: registeredUsers.errorMsg, link: routes.loginPage, disabled: true }) :
                    "";

    }, [registeredUsers.errorMsg, registeredUsers.emails]);

    const handleMovingToInputSide = (e) => {
        e.preventDefault();
        setDisplayInfoSide(false);
    };

    const handleMobileDisplay = () => {
        setDisplayInfoSide(false);
    }

    return (
        <FormStyle>
            <AppInfoSide
                handleClickOnMobile={handleMovingToInputSide}
                linkData={linkData}
                buttonName={buttonName}
                href={linkData.href}
                animated={true}
                displayedOnMobile={displayInfoSide}
            />
            <FormInputSide
                loginFormData={registrationData.formInformation}
                linkData={linkData}
                buttonName={"Sign up"}
                initialValues={initialValues}
                header={"Create an account to start tracking your budget"}
                additionalValidationData={emails}
                handleFormSubmit={handleFormSubmit}
                error={errorMsgFromValidation}
                handleMobileDisplay={handleMobileDisplay}
                displayedOnMobile={!displayInfoSide}
                yupValidationSchema={validations.getRegistrationValidationSchema}
                animated={true}
            />
        </FormStyle>
    );
};

export { RegistrationForm }
