import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, Redirect} from 'react-router-dom';

import LoginForm from "./../LoginForm/LoginForm";
import {emailLoginValidation, passwordLoginValidation} from "./manageLoginFormData";
import {userActions} from "../../redux/actions/userActions";
import { validationManager } from "../../components/validationManager/validationManager";

const ManageLoginForm = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [firstRender, setFirstRender] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formCorrectness, setFormCorrectness] = useState(false);
  const [formModified, setFormModified] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [validation, setValidation] = useState({
    emailLoginValidation,
    passwordLoginValidation
  });

  const validationNames = {
    email: "emailLoginValidation",
    password: "passwordLoginValidation"
  };

  const dependencyBetweenInputNameAndValidation = {
    email: validationNames.email,
    password: validationNames.password
  };

  const prepareValueToValidation = (validationName) => {
    const { email, password} = validationNames;
    let value = {};
    switch (validationName) {
      case email:
        value = {
          valueToBeValidated: user.email,
          arr: users,
        };
        break;
      case password:
        value = {
          valueToBeValidated: user.password,
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
  };

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
    if (localStorage.getItem("token")) {
      history.push("/dashboard");
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      handleResize();
      validationManager.configureInitialSetup(
        validation,
        dependencyBetweenInputNameAndValidation,
        prepareValueToValidation
      );
    } else {
      setFormModified(true);
      performSingleFieldValidation();
    }

    if (users.length === 0) {
      dispatch(userActions.loadUsers());
    }
  }, [user]);


  useEffect(() => {
    if (isFormSubmitted) {
      const temp = { ...user };
      delete temp.lastModifiedField;

      const dataForValidation = Object.keys(temp).map((fieldName) => {
        const valueToBeValidated = prepareValueToValidation(
          validationNames[fieldName]
        );
        valueToBeValidated.fieldName = fieldName;
        return valueToBeValidated;
      });

      const [finalResult, isFormCorrect] = validationManager.submitForm(
        dataForValidation
      );
      setValidation(finalResult);
      setFormCorrectness(isFormCorrect);

      setFormModified(true);

      if(isFormCorrect === true){
        dispatch(userActions.login(user, history));
      }else{
        setIsFormSubmitted(false);
      }
    }
  }, [isFormSubmitted]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
      lastModifiedField: name,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);
  };

  const onClickHandleMobile = (e) => {
    e.preventDefault();
    setFormModified(true);
  };

  return (
    <LoginForm
      user={user}
      onChange={onChangeHandler}
      validation={validation}
      onSubmit={onSubmit}
      formCorrectness={formCorrectness}
      isModified={formModified}
      isMobile={isMobile}
      onClickHandleMobile={onClickHandleMobile}
      firstRender={firstRender}
    />
  );
};

export {ManageLoginForm}
