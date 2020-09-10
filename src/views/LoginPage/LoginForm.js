import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import styled from "styled-components";
import AppInfoSide from "components/AppInfoSide/AppInfoSide";
import FormInputSide from "components/FormInputSide/FormInputSide";
import { userActions } from "redux/actions/userActions";
import { loginData } from "./loginFormData"
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

const linkData = { text: "Don't have an account?", linkText: "Sign up", href: routes.registrationPage };
const buttonName = "Sign in";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const registeredUsers = useSelector(state => state.users);
  const [displayInfoSide, setDisplayInfoSide] = useState(true)
  const [emails, setEmails] = useState([]);
  const [errorMsgFromValidation, setErrorMsgFromValidation] = useState("");

  const handleFormSubmit = (values, {setFieldValue}) => {
    dispatch(userActions.login(values)).then(updated=>{
      history.push(routes.dashboard);
    }).catch(error=> {
      setFieldValue("password", "");
      setErrorMsgFromValidation({msg: error.message});
    })
  }

  useEffect(() => {
    const loadingDataFinished = registeredUsers.hasOwnProperty("emails") || registeredUsers.hasOwnProperty("errorMsg");

    const action = !loadingDataFinished ? dispatch(userActions.loadUsers()) :
      registeredUsers.hasOwnProperty("emails") ? setEmails(registeredUsers.emails) :
        registeredUsers.hasOwnProperty("errorMsg") ? setErrorMsgFromValidation({ msg: registeredUsers.errorMsg, link: routes.loginPage, disabled: true }) :
        "";

  },[registeredUsers.errorMsg, registeredUsers.emails]);

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
        animated={false}
        displayedOnMobile={displayInfoSide}
      />
      <FormInputSide
        loginFormData={loginData.formInformation}
        linkData={linkData}
        buttonName={"Log in"}
        initialValues={initialValues}
        header={"Welcome again!"}
        additionalValidationData={emails}
        handleFormSubmit={handleFormSubmit}
        error={errorMsgFromValidation}
        handleMobileDisplay={handleMobileDisplay}
        displayedOnMobile={!displayInfoSide}
        yupValidationSchema={validations.getLoginValidationSchema}
        animated={false}
      />
    </FormStyle>
  );
};

export {LoginForm}
