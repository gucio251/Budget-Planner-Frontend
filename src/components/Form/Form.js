import React from "react";
import styled from "styled-components";
import AppInfoSide from "components/AppInfoSide/AppInfoSide";
import FormInputSide from "components/FormInputSide/FormInputSide";

const FormStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  ${({ theme }) => theme.devices.tablet} {
    display: block;
    flex-direction: column;
    overflow-y: auto;
  }

  ${({ theme }) => theme.devices.mobile} {
    height: 100vh;
    display: flex;
    flex-direction: row;
    overflow-y: hidden;
  }
`;

const Form = ({ users, handleFormSubmit, loginErrors, displayInfoSide, handleMovingToInputSide, handleMobileDisplay, settings}) => {
    const {validationSchema, linkData, buttonName, animatedInfoSide, animatedInputSide,inputFieldsInformation, initialValues, header} = settings;
    return (
        <FormStyle>
            <AppInfoSide
                handleClickOnMobile={handleMovingToInputSide}
                linkData={linkData}
                buttonName={buttonName}
                animated={animatedInfoSide}
                displayedOnMobile={displayInfoSide}
            />
            <FormInputSide
                loginFormData={inputFieldsInformation}
                linkData={linkData}
                buttonName={buttonName}
                initialValues={initialValues}
                header={header}
                additionalValidationData={users.emails}
                handleFormSubmit={handleFormSubmit}
                error={loginErrors}
                handleMobileDisplay={handleMobileDisplay}
                displayedOnMobile={!displayInfoSide}
                yupValidationSchema={validationSchema}
                animated={animatedInputSide}
            />
        </FormStyle>
    );
};

export default Form;
