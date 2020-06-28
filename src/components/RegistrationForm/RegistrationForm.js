import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RegistrationInputSide from "./../RegistrationInputSide/RegistrationInputSide";
import AppInfoSide from "./../AppInfoSide/AppInfoSide";
import SuccessWindow from "./../SuccessWindow/SuccessWindow";
import { names, labels, types } from "./registrationFormData";

const FormStyle = styled.div.attrs(({ className }) => ({
  className,
}))`
  display: flex;
  width: 100%;
  height: 100%;

  form {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .registration-form-info-side {
    width: 50%;
    height: 100vh;
    display: flex;
    justify-content: center;
    color: white;
    flex-direction: column;
    background-color: ${({ theme }) => theme.mainBlue};
  }

  .registration-form-user-input-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin-left: 72px;
  }

  @media (max-width: 961px) and (min-width: 577px) and (min-height: 599px) {
    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      overflow: hidden;
    }

    .registration-form-info-side {
      width: 100%;
      height: 50vh;
    }

    .registration-form-user-input-side {
      width: 100%;
      height: 50vh;
      justify-content: center;
      align-items: center;
      margin-left: 0;
    }
  }

  @media (max-height: 600px) {
    form {
      display: flex;
      margin: 0;
    }

    .registration-form-info-side {
      display: flex;
      height: 120vh;
    }

    .registration-form-user-input-side {
      display: flex;
      height: 120vh;
      width: 50%;
      padding: 0 32px;
      margin: 0;
    }
  }

  @media (max-width: 576px) {
    .registration-form-info-side {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
    }

    .registration-form-user-input-side {
      display: none;
      width: 100%;
      margin-left: 0;
    }
  }

  .visible {
    display: flex;
  }

  .invisible {
    display: none;
  }
`;

const RegistrationForm = ({ user, onChange, validation, onSubmit }) => {
  const { password, repeatedPassword, email } = user;
  const {
    emailValidation,
    passwordValidation,
    repeatedPasswordValidation,
  } = validation;

  const validations = {
    email: emailValidation,
    password: passwordValidation,
    repeatedPassword: repeatedPasswordValidation,
  };

  const values = {
    email,
    password,
    repeatedPassword,
  };

  const calculateCorrectness = validationSet => {
    return validationSet.fieldCorrectness ? validationSet.fieldCorrectness : false;
  }

  const calculateVisibility = (validation, specValidation) => {
    return validation.type === "submit" ? true: specValidation.hasOwnProperty("fieldCorrectness") ? true : false;
  }
  const inputFieldsData = [
    {
      name: names.email,
      value: values.email,
      label: labels.email,
      specValidation: validations.email,
      type: types.text,
      visibility: calculateVisibility(validation, validations.email),
      fieldCorrectness: calculateCorrectness(validations.email),
    },
    {
      name: names.password,
      value: values.password,
      label: labels.password,
      specValidation: validations.password,
      type: types.password,
      visibility: calculateVisibility(validation, validations.password),
      fieldCorrectness: calculateCorrectness(validations.password),
    },
    {
      name: names.repeatedPassword,
      value: values.repeatedPassword,
      label: labels.repeatedPassword,
      specValidation: validations.repeatedPassword,
      type: types.password,
      visibility: calculateVisibility(validation, validations.repeatedPassword),
      fieldCorrectness: calculateCorrectness(validations.repeatedPassword),
    },
  ];

  const infoArea = document.getElementsByClassName(
    "registration-form-info-side"
  )[0];
  const inputFieldsArea = document.getElementsByClassName(
    "registration-form-user-input-side"
  )[0];

  const onClickHandleMobile = (e) => {
    e.preventDefault();

    infoArea.classList.add("invisible");
    inputFieldsArea.classList.add("visible");
  };

  const handleResize = () => {
    if (window.innerWidth > 576) {
      infoArea.classList.remove("invisible");
      inputFieldsArea.classList.remove("visible");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <FormStyle>
      <form onSubmit={onSubmit}>
        <AppInfoSide
          className="registration-form-info-side"
          onClick={onClickHandleMobile}
        />
 {/*        <RegistrationInputSide
          className="registration-form-user-input-side"
          inputFieldsData={inputFieldsData}
          onClick={onSubmit}
          onChange={onChange}
          user={user}
        /> */}
        <SuccessWindow className="registration-form-user-input-side" successMessage="Account successfully created!"/>
      </form>
    </FormStyle>
  );
};

RegistrationForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;
