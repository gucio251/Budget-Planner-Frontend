import React, {useEffect, useRef} from "react";
import { Formik } from "formik";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import {
  StyledInputSide,
  StyledInputFields,
  StyledForm,
  StyledInputSideHeader,
  ButtonWrapper,
  RedirectComponentWrapper
} from "components/FormInputSide/FormInputSide.styled"
import Button from "components/UI/Button";
import ErrorMessageBox from "components/UI/ErrorMessageBox";
import InputTextWithValidation from "components/UI/InputTextWithValidation/InputTextWithValidation";
import RedirectComponent from "components/UI/RedirectComponent";
import validate from "components/validate-yup/validate-yup";

const configureDisplayOnMobile = (fieldsStatues, func) => {
  if (Object.keys(fieldsStatues).length !== 0) {
    func();
  }
}

const FormContainer = ({
  formData,
  linkData,
  displayedOnMobile,
  buttonName,
  handleFormSubmit,
  stateErrors,
  header,
  handleMobileDisplay,
  animated,
  initialValues,
  yupValidationSchema,
  additionalValidationData
}) => {
  const inputSide = useRef();

  useEffect(() => {
    if (animated) {
      const [elements] = inputSide.current.children;

      gsap.set([elements], { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      tl.fromTo(elements, { x: '600' }, { x: 0, autoAlpha: 1 }, '+=3');

    }
  },[animated]);
  const { text, linkText, href } = linkData;

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchemaOptions={{ showMultipleFieldErrors: true }}
      validate={validate(yupValidationSchema, additionalValidationData)}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleBlur, touched, values, errors }) => {
        return (
          <div ref={inputSide}>
            <StyledInputSide displayedOnMobile={displayedOnMobile}>
              <StyledForm>
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
                        errors={
                          values[name] !== '' && errors.hasOwnProperty(name)
                            ? errors[name]
                            : touched.hasOwnProperty(name) &&
                              errors.hasOwnProperty(name)
                            ? errors[name]
                            : []
                        }
                        touched={touched[name]}
                        disabled={stateErrors ? stateErrors.disabled : false}
                      />
                    );
                  })}
                  <ButtonWrapper>
                    <Button
                      color="#264AE7"
                      disabled={
                        Object.keys(touched).length === formData.length &&
                        Object.keys(errors).length === 0
                          ? false
                          : true
                      }
                    >
                      {buttonName}
                    </Button>
                  </ButtonWrapper>
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
        );
      }}
    </Formik>
  );
};

FormContainer.propTypes = {
  additionalValidationData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      errorMsgs: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  handleSubmit: PropTypes.func,
  errorMsgs: PropTypes.string,
  displayedOnMobile: PropTypes.bool.isRequired,
  animated: PropTypes.bool.isRequired,
};

export default FormContainer;

