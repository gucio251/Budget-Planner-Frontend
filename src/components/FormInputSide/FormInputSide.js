import React from "react";
import {motion} from "framer-motion";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../atoms/Button";
import ErrorMessageBox from "../atoms/ErrorMessageBox";
import InputTextWithValidation from "../atoms/InputTextWithValidation";
import RedirectComponent from "../atoms/RedirectComponent";

const StyledInputFields = styled(motion.div).attrs(({ className }) => ({
  className,
}))`
  .span-text {
    font-size: 16px;
    position: relative;
    display: inline-block;
  }

  .input-field {
    flex: 1 1 100%;
    display: block;
    position: relative;
    margin-bottom: 40px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    width: 344px;
  }

  .registration-create-acc {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 32px;
    color: ${({ theme }) => theme.mainBlue};
    width: 259px;
  }

  .input-fields-area {
    position: relative;
    margin-bottom: 48px;
  }

  .login-switch {
    margin-top: 24px !important;
    color: ${({ theme }) => theme.darkGray};
  }

  @media (max-height: 600px) {
    .registration-create-acc {
      font-size: 16px;
      font-weight: normal;
    }

    .input-fields-area {
      padding-right: 20px;
    }

    .wrapper {
      margin-top: 55px;
    }

    .registration-form-user-input-side {
      margin-left: 0;
    }
  }

  @media (max-width: 961px) and (min-width: 577px) and (min-height: 599px) {
    .wrapper{
      padding: 50px 0 0 50px;
    }
    .registration-create-acc {
      font-size: 14px;
    }
    .login-switch{
      font-size: 14px;
    }
  }

  @media (max-width: 576px) {
    .registration-create-acc{
      width: 43%;
    }
    .wrapper {
      width: 100%;
      height: 85%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 100%;
    }
  }
`;

const StyledInputVariants = {
    initial: {x:1000},
    final: {
        x: 0,
        transition: { delay: 1.4, type: "tween" }
    }
}

const FormInputSide = ({inputFieldsData, handleFormSubmit, handleFieldUpdate, className, firstRender, title, linkData, buttonName, errorMsg}) => {
    const {text, linkText, href} = linkData;
    const disabled = typeof(errorMsg)=== "undefined" ? false : errorMsg.link ? true : false;
    return (
      <StyledInputFields
        className={className}
        initial={firstRender ? "initial" : null}
        animate={firstRender ? "final" : null}
        variants={StyledInputVariants}
      >
        <div className="wrapper">
          <span className="registration-create-acc">
            {title}
          </span>
          <div className="input-fields-area">
            {inputFieldsData.map(
              ({
                name,
                value,
                label,
                specValidation,
                type,
                visibility,
                fieldCorrectness,
              }) => {
                return (
                  <InputTextWithValidation
                    key={name}
                    name={name}
                    value={value}
                    label={label}
                    className="input-field"
                    handleFieldUpdate={handleFieldUpdate}
                    validation={specValidation}
                    type={type}
                    visibility={visibility}
                    fieldCorrectness={fieldCorrectness}
                    disabled={disabled}
                  />
                );
              }
            )}
            <Button
              className="margin-button"
              title={buttonName}
              handleFormSubmit={handleFormSubmit}
              disabled={disabled}
            />
            <RedirectComponent
              className="login-switch span-text"
              spanText={text}
              linkText={linkText}
              href={href}
              linkColor="mainBlue"
            />
            {errorMsg && (<ErrorMessageBox errorMsg={errorMsg}/>)}
          </div>
        </div>
      </StyledInputFields>
    );
};

FormInputSide.propTypes = {
  className: PropTypes.string.isRequired,
  inputFieldsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      specValidation: PropTypes.object.isRequred,
      type: PropTypes.string.isRequired,
      visibility: PropTypes.bool.isRequired,
      fieldCorrectness: PropTypes.bool.isRequired,
    })
  ).isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleFieldUpdate: PropTypes.func.isRequired,
  firstRender: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  linkData: PropTypes.shape({
    text: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  buttonName: PropTypes.string.isRequired,
  errorMsg: PropTypes.shape({
    msg: PropTypes.string.isRequired,
    link: PropTypes.string,
  }),
};

export default FormInputSide;