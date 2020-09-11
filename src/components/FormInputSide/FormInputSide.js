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

const StyledInputVariants = {
    initial: {x:1000},
    final: {
        x: 0,
        transition: { delay: 1.4, type: "tween" }
    }
}

window.MyComponentRef = React.createRef();

const detectFieldsStatuses = (validationErrors, fieldsData, values) => {
  const validationErrorsArr = Object.keys(validationErrors).map((key) => validationErrors[key]) || [];
  const formInitialized = Object.values(values).reduce((values, value)=> values+=value);

  return fieldsData.map((fieldData) => {
    const validationErrorsForSpecificField = validationErrorsArr.find((validationErr) => validationErr.name === fieldData.name) || [];
    const fieldCorrectness = validationErrorsForSpecificField.length === 0 ? true : false;

    const modifiedErrorMsgs = fieldData.errorMsgs.map((errorMsg) => {
      if (fieldCorrectness && formInitialized) {
        return { errorMsg: errorMsg, correctness: true };
      } else if (fieldCorrectness && !formInitialized) {
        return { errorMsg: errorMsg, correctness: false };
      } else {
        const isCorrect = !validationErrorsForSpecificField.errorMsgs.includes(errorMsg);
        return { errorMsg: errorMsg, correctness: isCorrect };
      }
    });

    return {
      ...fieldData,
      ["errorMsgs"]: modifiedErrorMsgs,
      ["fieldCorrectness"]: formInitialized ? fieldCorrectness : null,
    };
  });
};

const configureDisplayOnMobile = (fieldsStatues, func) => {
  if (Object.keys(fieldsStatues).length !== 0) {
    func();
  }
}

const FormContainter = ({yupValidationSchema, loginFormData, linkData, buttonName, initialValues, additionalValidationData, handleFormSubmit, error, header, displayedOnMobile, handleMobileDisplay, animated}) => {
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
          loginFormData={loginFormData}
          linkData={linkData}
          buttonName={buttonName}
          error={error}
          header={header}
          displayedOnMobile={displayedOnMobile}
          handleMobileDisplay={handleMobileDisplay}
          animated={animated}
        />
      )}
    />
  );
}


const FormInputSide = ({loginFormData, linkData, buttonName, handleSubmit, handleChange, handleBlur, errors, values, touched, error, header, handleMobileDisplay, animated}) => {
  configureDisplayOnMobile(touched, handleMobileDisplay);
  const inputSide = useRef();
  const [animationFinished, setAnimationFinished] = useState(false);

  useLayoutEffect(()=>{
    if(animated && !animationFinished){
      const [elements] = inputSide.current.children;

      gsap.set([elements], { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.fromTo(elements, { x: "600" }, { x: 0, autoAlpha: 1 }, "+=3");

      setAnimationFinished(true);
    }
  });
  const {text, linkText, href} = linkData;
  const validatedFieldsStatuses = detectFieldsStatuses(errors, loginFormData, values);
  return (
    <div ref={inputSide}>
      <StyledInputSide>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInputSideHeader>{header}</StyledInputSideHeader>
          <StyledInputFields>
            {validatedFieldsStatuses.map(
              ({ name, label, type, errorMsgs, fieldCorrectness }) => {
                return (
                  <InputTextWithValidation
                    key={name}
                    name={name}
                    label={label}
                    value={values[name]}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    type={type}
                    errorsStatuses={errorMsgs}
                    fieldCorrectness={fieldCorrectness}
                    touched={touched[name]}
                    disabled={error.disabled || false}
                  />
                );
              }
            )}
            <Button
              title={buttonName}
              handleFormSubmit={handleSubmit}
              disabled={error.disabled || false}
            />
            <RedirectComponentWrapper>
              <RedirectComponent
                spanText={text}
                linkText={linkText}
                href={href}
                linkColor="mainBlue"
              />
            </RedirectComponentWrapper>
            {error && (<ErrorMessageBox error={error} />)}
          </StyledInputFields>
        </StyledForm>
      </StyledInputSide>
    </div>
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
  linkData: PropTypes.shape({
    text: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  buttonName: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  additionalValidationData: PropTypes.array,
  handleFormSubmit: PropTypes.func.isRequired,
  errorMsgs: PropTypes.string,
  displayedOnMobile: PropTypes.bool.isRequired,
  animated: PropTypes.bool.isRequired
}

export default FormContainter;

