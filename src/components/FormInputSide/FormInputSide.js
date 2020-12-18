<<<<<<< HEAD
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
=======
import React, {useLayoutEffect, useRef, useState} from "react";
import { Formik } from "formik";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import {
  StyledInputSide,
  StyledInputFields,
  StyledForm,
  StyledInputSideHeader,
  RedirectComponentWrapper
} from "components/FormInputSide/FormInputSide.styled"
import Button from "components/UI/Button";
import ErrorMessageBox from "components/UI/ErrorMessageBox";
import InputTextWithValidation from "components/UI/InputTextWithValidation/InputTextWithValidation";
import RedirectComponent from "components/UI/RedirectComponent";
import validate from "components/validate-yup/validate-yup";
import ValidationContainer from "containers/ValidationContainer"

window.MyComponentRef = React.createRef();

const configureDisplayOnMobile = (fieldsStatues, func) => {
  if (Object.keys(fieldsStatues).length !== 0) {
    func();
  }
}

const FormContainter = ({yupValidationSchema, formData, linkData, buttonName, initialValues, additionalValidationData, handleFormSubmit, stateErrors, header, displayedOnMobile, handleMobileDisplay, animated}) => {
  return (
    <Formik
      innerRef={window.MyComponentRef}
      initialValues={initialValues}
      validate={validate(yupValidationSchema, additionalValidationData)}
      validationSchemaOptions={{ showMultipleFieldErrors: true }}
      onSubmit={handleFormSubmit}
      enableReinitialize={true}
      render={(formikProps) => (
        <FormInputSide
          {...formikProps}
          formData={formData}
          linkData={linkData}
          buttonName={buttonName}
          header={header}
          displayedOnMobile={displayedOnMobile}
          handleMobileDisplay={handleMobileDisplay}
          animated={animated}
          stateErrors={stateErrors}
        />
      )}
    />
  );
}


const FormInputSide = ({
  formData,
  linkData,
  displayedOnMobile,
  buttonName,
  handleSubmit,
  handleChange,
  handleBlur,
  errors,
  values,
  touched,
  stateErrors,
  header,
  handleMobileDisplay,
  animated,
}) => {
  configureDisplayOnMobile(touched, handleMobileDisplay);
  const inputSide = useRef();
  const [animationFinished, setAnimationFinished] = useState(false);

  useLayoutEffect(() => {
    if (animated && !animationFinished) {
      const [elements] = inputSide.current.children;

      gsap.set([elements], { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      tl.fromTo(elements, { x: '600' }, { x: 0, autoAlpha: 1 }, '+=3');

      setAnimationFinished(true);
    }
  });
  const { text, linkText, href } = linkData;

  return (
    <ValidationContainer touched={touched} errors={errors} values={values}>
      {({ fieldsInitialized, fieldsCorrectness, buttonDisabled }) => (
        <div ref={inputSide}>
          <StyledInputSide>
            <StyledForm onSubmit={handleSubmit}>
              <StyledInputSideHeader>{header}</StyledInputSideHeader>
              <StyledInputFields>
                {formData.map(({ name, label, type }) => {
                  return (
                    <InputTextWithValidation
                      key={name}
                      name={name}
                      label={label}
                      value={values[name]}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      type={type}
                      errorsStatuses={
                        Object.keys(errors).length === 0 ||
                        !errors.hasOwnProperty(name)
                          ? []
                          : errors[name]
                      }
                      fieldCorrectness={
                        Object.keys(fieldsCorrectness).length === 0
                          ? false
                          : fieldsCorrectness[name]
                      }
                      fieldInitialized={fieldsInitialized[name]}
                      touched={touched[name]}
                      disabled={stateErrors ? stateErrors.disabled : false}
                    />
                  );
                })}
                <Button
                  handleSubmit={handleSubmit}
                  disabled={stateErrors.disabled || buttonDisabled}
                >
                  {buttonName}
                </Button>
                <RedirectComponentWrapper>
                  <RedirectComponent
                    spanText={text}
                    linkText={linkText}
                    href={href}
                    linkColor="mainBlue"
                  />
                </RedirectComponentWrapper>
                {stateErrors && <ErrorMessageBox error={stateErrors} />}
              </StyledInputFields>
            </StyledForm>
          </StyledInputSide>
        </div>
      )}
    </ValidationContainer>
  );
};

FormInputSide.propTypes = {
  loginFormData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      errorMsgs: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  ).isRequired,
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
  linkData: PropTypes.shape({
    text: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  buttonName: PropTypes.string.isRequired,
<<<<<<< HEAD
  errorMsg: PropTypes.shape({
    msg: PropTypes.string.isRequired,
    link: PropTypes.string,
  }),
};

export default FormInputSide;
=======
  initialValues: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  additionalValidationData: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  errorMsgs: PropTypes.string,
  displayedOnMobile: PropTypes.bool.isRequired,
  animated: PropTypes.bool.isRequired
}

export default FormContainter;

>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
