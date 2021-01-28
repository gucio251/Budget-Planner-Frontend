import React from "react";
import { Formik } from "formik";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { mobileViewActions } from 'redux/actions/mobileViewActions';
import {
  Wrapper,
  StyledInputSide,
  StyledForm,
  StyledInputSideHeader,
} from "components/FormInputSide/FormInputSide.styled"
import Button from "components/UI/Button";
import ErrorMessageBox from "components/UI/ErrorMessageBox";
import InputTextWithValidation from "components/UI/InputTextWithValidation/InputTextWithValidation";
import RedirectComponent from "components/UI/RedirectComponent";
import validate from "components/validate-yup/validate-yup";

const FormContainer = ({
  formData,
  linkData,
  buttonName,
  handleFormSubmit,
  stateErrors,
  header,
  initialValues,
  yupValidationSchema,
  additionalValidationData
}) => {
  const dispatch = useDispatch();
  const visibleOnMobile = useSelector(state => state.mobileView.onlyWorkingViewVisible);
  const { text, linkText, href } = linkData;

  const checkIfFormIsModified = touchedItems => {
    if(Object.keys(touchedItems).length !== 0){
      dispatch(mobileViewActions.setWorkingViewVisible());
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchemaOptions={{ showMultipleFieldErrors: true }}
      validate={validate(yupValidationSchema, additionalValidationData)}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleBlur, touched, values, errors }) => {
        checkIfFormIsModified(touched);
        return (
          <Wrapper displayedOnMobile={visibleOnMobile}>
            <StyledInputSide>
              <StyledInputSideHeader>{header}</StyledInputSideHeader>
              <StyledForm>
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
                  <Button
                    color="#264AE7"
                    disabled={
                      Object.keys(touched).length!== 0 &&
                      Object.keys(errors).length === 0
                        ? false
                        : true
                    }
                  >
                    {buttonName}
                  </Button>
              </StyledForm>
              <RedirectComponent
                spanText={text}
                linkText={linkText}
                href={href}
                linkColor="mainBlue"
              />
              {stateErrors && <ErrorMessageBox error={stateErrors} />}
            </StyledInputSide>
          </Wrapper>
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
};

export default FormContainer;

