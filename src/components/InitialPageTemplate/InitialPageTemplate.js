import React from "react";
import styled from "styled-components";
import AppInfoSide from "components/AppInfoSide/AppInfoSide";
import FormInputSide from "components/FormInputSide/FormInputSide";


const Wrapper = styled.div`
  height: 100vh;

  ${({ theme }) => theme.devices.tablet} {
    overflow-y: auto;
  }
`;
const PageStyle = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;

  ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: 100%;
    grid-template-rows: 50% 50%;
  }

  ${({ theme }) => theme.devices.mobile} {
    height: auto;
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
      <PageStyle>
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
      </PageStyle>
    </Wrapper>
  );
};

export default InitialPageTemplate;
