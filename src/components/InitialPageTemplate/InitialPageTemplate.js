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
  settings,
}) => {
  const {
    validationSchema,
    linkData,
    buttonName,
    inputFieldsInformation,
    initialValues,
    header,
  } = settings;
  return (
    <Wrapper>
        <AppInfoSide
          linkData={linkData}
          buttonName={buttonName}
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
          yupValidationSchema={validationSchema}
        />
    </Wrapper>
  );
};

export default InitialPageTemplate;
