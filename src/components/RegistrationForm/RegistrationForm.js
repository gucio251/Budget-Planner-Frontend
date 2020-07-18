import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RegistrationInputSide from "./../RegistrationInputSide/RegistrationInputSide";
import AppInfoSide from "./../AppInfoSide/AppInfoSide";
import SuccessWindow from "./../SuccessWindow/SuccessWindow";
import { names, labels, types} from "./registrationFormData";


const FormStyle = styled.div.attrs(({ className }) => ({
  className,
}))`
  display: flex;
  width: 100%;
  height: 100%;
`;

const RegistrationForm = ({user, onChange, validation, onSubmit, formCorrectness, isModified, isMobile, onClickHandleMobile, firstRender}) => {
  const {password, repeatedPassword, email } = user;
  const {emailValidation, passwordValidation, repeatedPasswordValidation} = validation;

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
    const {name, isMobile, isModified, formCorrectness} = form;

    const notMobileVisibilityRequirements = {
      "info": [{isMobile: false}],
      "fields": [{ formCorrectness: false }],
      "success": [{ formCorrectness: true }]
    };

    const mobileVisibilityRequirements = {
      "info": [{isModified: false},{formCorrectness: false}],
      "fields": [{isModified: true},{formCorrectness: false}],
      "success": [{formCorrectness: true}]
    }

    const requirements = isMobile===true ? mobileVisibilityRequirements[name] : notMobileVisibilityRequirements[name];
    delete form.name;

    let resultArr = requirements.map(requirement => {return Object.keys(requirement).map(property => requirement[property] === form[property])});

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

  return (
    <FormStyle>
      <form onSubmit={onSubmit}>
        {calculateFormItemsVisibility({"isMobile":isMobile,"isModified": isModified, "name":"info", "formCorrectness": formCorrectness}) && (<AppInfoSide
          className="form-info-side"
          onClick={onClickHandleMobile}
          formCorrectness={formCorrectness}
          firstRender={firstRender}
        />)}
        {calculateFormItemsVisibility({"isMobile":isMobile,"isModified": isModified, "name":"fields", "formCorrectness": formCorrectness}) && (
          <RegistrationInputSide
            className="form-user-input-side"
            inputFieldsData={inputFieldsData}
            onClick={onSubmit}
            onChange={onChange}
            user={user}
            firstRender={firstRender}
          />
        )}
        {calculateFormItemsVisibility({"isMobile":isMobile,"isModified": isModified, "name":"success", "formCorrectness": formCorrectness}) && (
          <SuccessWindow
            className="success-window"
            successMessage="Account successfully created!"
          />
        )}
      </form>
    </FormStyle>
  );
};

RegistrationForm.propTypes = {
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formCorrectness: PropTypes.bool.isRequired,
  formModified: PropTypes.bool.isRequired
};

export default RegistrationForm;
