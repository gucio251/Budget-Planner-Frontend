import React from 'react';
import InputTextWithValidation from "../atoms/InputTextWithValidation";
import RedirectComponent from "../atoms/RedirectComponent";
import Button from "../atoms/Button";
import styled from "styled-components";
import { motion } from "framer-motion";

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

  @media (max-width: 576px) {
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

const RegistrationInputSide = ({inputFieldsData, onClick, onChange, user, className}) => {
    return (
      <StyledInputFields className={className} initial="initial" animate="final" variants={StyledInputVariants}>
        <div className="wrapper">
          <span className="registration-create-acc">
            Create an account to start tracking your budget
          </span>
          <div className="input-fields-area">
            {inputFieldsData.map(
              ({ name, value, label, specValidation, type, visibility, fieldCorrectness }) => {
                return (
                  <InputTextWithValidation
                    key={name}
                    name={name}
                    value={value}
                    label={label}
                    className="input-field"
                    onChange={onChange}
                    validation={specValidation}
                    type={type}
                    visibility={visibility}
                    fieldCorrectness={fieldCorrectness}
                  />
                );
              }
            )}
            <Button
              className="margin-button"
              title="Sign up"
              onClick={onClick}
            />
            <RedirectComponent
              className="login-switch span-text"
              spanText="Already have an account?"
              linkText="Log in"
              href="/heheh"
              linkColor="mainBlue"
            />
          </div>
        </div>
      </StyledInputFields>
    );
};

export default RegistrationInputSide;