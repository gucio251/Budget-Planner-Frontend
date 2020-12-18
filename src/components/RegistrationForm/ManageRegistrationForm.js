import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {routes} from "./../../routes"

import RegistrationForm from "./RegistrationForm";
import { emailValidation, passwordValidation, repeatedPasswordValidation} from "./manageRegistrationFormData";
import {userActions} from "../../redux/actions/userActions";
import { validationManager } from "../../components/validationManager/validationManager";


const ManageRegistrationForm = () => {
  const registeredUsers = useSelector(state => state.users);
  const registrationStatus = useSelector(state => state.registration);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const [firstRender, setFirstRender] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formCorrectness, setFormCorrectness] = useState(false);
  const [formModified, setFormModified] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [coinAnimation, setCoinAnimation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(registrationStatus.errorMsg);

  const [validation, setValidation] = useState({
    emailValidation,
    passwordValidation,
    repeatedPasswordValidation,
  });

  const validationNames = {
    email: "emailValidation",
    password: "passwordValidation",
    repeatedPassword: "repeatedPasswordValidation",
  };

  const dependencyBetweenInputNameAndValidation = {
    email: validationNames.email,
    password: validationNames.password,
    repeatedPassword: validationNames.repeatedPassword,
  };

  const prepareValueToValidation = (validationName) => {
    const { email, password, repeatedPassword } = validationNames;
    let value = {};
    switch (validationName) {
      case email:
        value = {
          valueToBeValidated: user.email || " ",
          arr: registeredUsers,
        };
        break;
      case password:
        value = {
          valueToBeValidated: user.password,
        };
        break;
      case repeatedPassword:
        value = {
          valueToBeValidated: user.repeatedPassword,
          repeatedPassword: user.password,
        };
        break;
      default:
        return;
    }
    return value;
  };

  const performSingleFieldValidation = () => {
    const fieldModified = user.lastModifiedField;
    const result = performSingleValidation(fieldModified);
    const validationName = Object.keys(result)[0];
    const validatedObj = Object.values(result)[0];
    setValidation((prevState) => {
      return {
        ...prevState,
        [validationName]: validatedObj,
      };
    });
  }

  const performSingleValidation = (modifiedFieldName) => {
    const valuetoBeValidated = prepareValueToValidation(
      validationNames[modifiedFieldName]
    );

    return validationManager.validate(modifiedFieldName, valuetoBeValidated);
  };

  const handleResize = () => {
    window.visualViewport.width > 576 ? setIsMobile(false) : setIsMobile(true);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });


  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      handleResize();
      validationManager.configureInitialSetup(validation,dependencyBetweenInputNameAndValidation,prepareValueToValidation);
    } else {
      setFormModified(true);
      performSingleFieldValidation();
    }

    if (registeredUsers.length === 0) {
      dispatch(userActions.loadUsers());
    }
  }, [user]);

  useEffect(()=> {
    registeredUsers.errorMsg && setErrorMsg({msg: registeredUsers.errorMsg, link: routes.registrationPage})
  })

  useEffect(()=>{
    if(isFormSubmitted && formCorrectness && !coinAnimation){
      setCoinAnimation(true);
    }else if(isFormSubmitted && formCorrectness && coinAnimation){
      setCoinAnimation({status: "done"});
    }
  }, [isFormSubmitted, formCorrectness, isMobile])

  useEffect(() => {
    if(isFormSubmitted){
    const temp = { ...user };
    delete temp.lastModifiedField;

    const dataForValidation = Object.keys(temp).map((fieldName) => {
      const valueToBeValidated = prepareValueToValidation(validationNames[fieldName]);
      valueToBeValidated.fieldName = fieldName;
      return valueToBeValidated;
    });

      const [finalResult, isFormCorrect ] = validationManager.submitForm(dataForValidation);
      setValidation(finalResult);
      setFormCorrectness(isFormCorrect);

      setFormModified(true);
      isFormCorrect === true ? dispatch(userActions.addUser(user)) : setIsFormSubmitted(false);
    }
  }, [isFormSubmitted])

  const handleFieldUpdate = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
      lastModifiedField: name,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);
  };

  const onClickHandleMobile = (e) => {
    e.preventDefault();
    setFormModified(true);
  };

  return (
    <RegistrationForm
      user={user}
      handleFieldUpdate={handleFieldUpdate}
      validation={validation}
      handleFormSubmit={handleFormSubmit}
      formCorrectness={formCorrectness}
      isModified={formModified}
      isMobile={isMobile}
      onClickHandleMobile={onClickHandleMobile}
      firstRender={firstRender}
      animation={coinAnimation}
      errorMsg={errorMsg}
    />
  );
};

export { ManageRegistrationForm };