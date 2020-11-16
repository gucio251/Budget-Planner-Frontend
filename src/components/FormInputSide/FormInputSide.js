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
import ValidationContainer from "Containers/ValidationContainer"

window.MyComponentRef = React.createRef();

const configureDisplayOnMobile = (fieldsStatues, func) => {
  if (Object.keys(fieldsStatues).length !== 0) {
    func();
  }
}

const FormContainter = ({yupValidationSchema, formData, linkData, buttonName, initialValues, additionalValidationData, handleFormSubmit, error, header, displayedOnMobile, handleMobileDisplay, animated}) => {
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
  error,
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
                      disabled={error.disabled || false}
                    />
                  );
                })}
                <Button
                  handleSubmit={handleSubmit}
                  disabled={error.disabled || buttonDisabled}
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
                {error && <ErrorMessageBox error={error} />}
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
  linkData: PropTypes.shape({
    text: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  buttonName: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  additionalValidationData: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  errorMsgs: PropTypes.string,
  displayedOnMobile: PropTypes.bool.isRequired,
  animated: PropTypes.bool.isRequired
}

export default FormContainter;

