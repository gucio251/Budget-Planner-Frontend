import React from "react";
import styled from "styled-components";
import AppInfoSide from "components/AppInfoSide/AppInfoSide";
import FormInputSide from "components/FormInputSide/FormInputSide";


const Wrapper = styled.div`
  display: flex;
  height: 100vh;

  ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    overflow-y: auto;
  }

  ${({ theme }) => theme.devices.mobile} {
    display: flex;
    flex-direction: row;
  }
`;

const InitialPageTemplate = ({
  users,
  handleFormSubmit,
  stateErrors,
  displayInfoSide,
  handleMovingToInputSide,
  handleMobileDisplay,
  settings,
}) => {
  const {
    validationSchema,
    linkData,
    buttonName,
    animatedInfoSide,
    animatedInputSide,
    inputFieldsInformation,
    initialValues,
    header,
  } = settings;
  return (
    <Wrapper>
        <AppInfoSide
          handleClickOnMobile={handleMovingToInputSide}
          linkData={linkData}
          buttonName={buttonName}
          animated={animatedInfoSide}
          displayedOnMobile={displayInfoSide}
        />
        <FormInputSide
          formData={inputFieldsInformation}
          linkData={linkData}
          buttonName={buttonName}
          initialValues={initialValues}
          header={header}
          additionalValidationData={users.emails}
          handleFormSubmit={handleFormSubmit}
          stateErrors={stateErrors}
          handleMobileDisplay={handleMobileDisplay}
          displayedOnMobile={!displayInfoSide}
          yupValidationSchema={validationSchema}
          animated={animatedInputSide}
        />
    </Wrapper>
  );
};

export default InitialPageTemplate;
