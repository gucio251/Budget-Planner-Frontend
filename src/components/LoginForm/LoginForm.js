import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RegistrationInputSide from "./../RegistrationInputSide/RegistrationInputSide";
import AppInfoSide from "./../AppInfoSide/AppInfoSide";
import { names, labels, types } from "./loginFormData";

const FormStyle = styled.div.attrs(({ className }) => ({
  className,
}))`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LoginForm = ({user, onChange, validation, onSubmit, formCorrectness, isModified, isMobile, handleClickOnMobile, errorMsg}) => {
  const { email, password } = user;
  const { emailLoginValidation, passwordLoginValidation } = validation;

  const validations = {
    email: emailLoginValidation,
    password: passwordLoginValidation
  };

  const values = {
    email,
    password
  };

  const calculateCorrectness = (validationSet) => {
    return validationSet.fieldCorrectness
      ? validationSet.fieldCorrectness
      : false;
  };

  const calculateVisibility = (validation, specValidation) => {
    return validation.type === "submit"
      ? true
      : specValidation.hasOwnProperty("fieldCorrectness")
      ? true
      : false;
  };

  const calculateFormItemsVisibility = (form) => {
    const { name, isMobile, isModified, formCorrectness } = form;

    const notMobileVisibilityRequirements = {
      info: [{ isMobile: false }],
      fields: [{ formCorrectness: false }]
    };

    const mobileVisibilityRequirements = {
      info: [{ isModified: false }, { formCorrectness: false }],
      fields: [{ isModified: true }, { formCorrectness: false }]
    };

    const requirements =
      isMobile === true
        ? mobileVisibilityRequirements[name]
        : notMobileVisibilityRequirements[name];
    delete form.name;

    let resultArr = requirements.map((requirement) => {
      return Object.keys(requirement).map(
        (property) => requirement[property] === form[property]
      );
    });

    resultArr = resultArr.flat();

    return resultArr.every((val) => val === true);
  };

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
    }
  ];

  const linkData = { text: "Don't have an account?", linkText: "Sign up" };
  const buttonName = "Sign in";
  const linkForRedirection = "/";

  return (
    <FormStyle>
      <form onSubmit={onSubmit}>
        {calculateFormItemsVisibility({
          isMobile: isMobile,
          isModified: isModified,
          name: "info",
          formCorrectness: formCorrectness,
        }) && (
          <AppInfoSide
            className="form-info-side"
            handleClickOnMobile={handleClickOnMobile}
            firstRender={false}
            linkData={linkData}
            buttonName={buttonName}
            href={linkForRedirection}
          />
        )}
        {calculateFormItemsVisibility({
          isMobile: isMobile,
          isModified: isModified,
          name: "fields",
          formCorrectness: formCorrectness,
        }) && (
          <RegistrationInputSide
            className="form-user-input-side"
            inputFieldsData={inputFieldsData}
            onClick={onSubmit}
            onChange={onChange}
            user={user}
            firstRender={false}
            title="Welcome again!"
            linkData={linkData}
            buttonName="Sign in"
            errorMsg={errorMsg}
          />
        )}
      </form>
    </FormStyle>
  );
};

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formCorrectness: PropTypes.bool.isRequired,
  isModified: PropTypes.bool.isRequired,
  errorMsg: PropTypes.string
};

export default LoginForm;
