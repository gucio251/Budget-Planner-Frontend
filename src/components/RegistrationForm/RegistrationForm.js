import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RegistrationInputSide from "./../RegistrationInputSide/RegistrationInputSide";
import AppInfoSide from "./../AppInfoSide/AppInfoSide";
import SuccessWindow from "./../SuccessWindow/SuccessWindow";
import { names, labels, types} from "./registrationFormData";
import { useTapGesture } from "framer-motion";

const FormStyle = styled.div.attrs(({ className }) => ({
  className
}))`
  display: flex;
  width: 100%;
  height: 100%;

  .fields{
    display: ${({inputFieldsMobileVisibility}) => inputFieldsMobileVisibility == null ? "flex" : inputFieldsMobileVisibility ? "flex" : "none"};
  }

  .info{
    display: ${({infoMobileVisibility}) => infoMobileVisibility == null ? "flex" : infoMobileVisibility ? "flex" : "none"};;
  }
`;

const RegistrationForm = ({user, onChange, validation, onSubmit, formCorrectness, formModified}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
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

  const calculateMobileVisibility = (form) => {
    const visibilityRequirements = {
      "info": [{"isMobile":true, "isMoved":false, "isModified":false}],
      "fields": [{"isMobile":true, "isMoved":true, "isModified":false},{"isMobile":true, "isMoved":false, "isModified":true}, {"isMobile":true, "isMoved":true, "isModified":true}]
    }

    if(form.isMobile !== true){
      return null;
    }
    const requirements = visibilityRequirements[form.name];
    delete form.name;

    let resultArr = requirements.map(requirement => {return Object.keys(form).map(formItem => requirement[formItem] === form[formItem])});

    const finalArr = resultArr.map(singleRes => singleRes.every((val) => val === true));

    return finalArr.includes(true);
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

  const infoArea = document.getElementsByClassName(
    "form-info-side"
  )[0];
  const inputFieldsArea = document.getElementsByClassName(
    "fields"
  )[0];

  const onClickHandleMobile = (e) => {
    e.preventDefault();
    setIsMoved(true);

  };

  const handleResize = () => {
    window.innerWidth > 576 ? setIsMobile(false) : setIsMobile(true);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <FormStyle
      formCorrectness={formCorrectness}
      infoMobileVisibility={calculateMobileVisibility({"isModified":formModified, "isMobile": isMobile, "isMoved": isMoved, "name": "info"})}
      inputFieldsMobileVisibility={calculateMobileVisibility({"isModified":formModified, "isMobile": isMobile, "isMoved": isMoved, "name": "fields"})}
    >
      <form onSubmit={onSubmit}>
        <AppInfoSide
          className="form-info-side info"
          onClick={onClickHandleMobile}
        />
        {!formCorrectness && (
          <RegistrationInputSide
            className="form-user-input-side fields"
            inputFieldsData={inputFieldsData}
            onClick={onSubmit}
            onChange={onChange}
            user={user}
          />
        )}
        {formCorrectness && (
          <SuccessWindow
            className="form-user-input-side success"
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
