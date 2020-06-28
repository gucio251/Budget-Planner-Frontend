import React, { useState, useEffect } from "react";
import RegistrationForm from "./RegistrationForm";
import {
  emailValidation,
  passwordValidation,
  repeatedPasswordValidation,
} from "./manageRegistrationFormData";
import { loadUsers } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { validationManager } from "../../components/validationManager/validationManager";
import { names } from "./registrationFormData";

const ManageRegistrationForm = ({ loadUsers, users }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const [firstRender, setFirstRender] = useState(true);

  const [validation, setValidation] = useState({
    emailValidation,
    passwordValidation,
    repeatedPasswordValidation,
  });

  const validationNames = {
    email: "emailValidation",
    password: "passwordValidation",
    repeatedPassword: "repeatedPasswordValidation",
  };

  const dependencyBetweenInputNameAndValidation = {
    email: validationNames.email,
    password: validationNames.password,
    repeatedPassword: validationNames.repeatedPassword,
  };

  const prepareValueObj = (singleValidation) => {
    const { email, password, repeatedPassword } = validationNames;
    let value = {};
    switch (singleValidation) {
      case email:
        value = {
          valueToBeValidated: user.email,
          arr: users.registeredUsers,
        };
        break;
      case password:
        value = {
          valueToBeValidated: user.password,
        };
        break;
      case repeatedPassword:
        value = {
          valueToBeValidated: user.repeatedPassword,
          repeatedPassword: user.password,
        };
        break;
      default:
        return;
    }
    return value;
  };

  const updateSingleValidationInState = (
    newSingleValidationState,
    validationToBeUpdated
  ) => {
    setValidation((prevState) => {
      return {
        ...prevState,
        [validationToBeUpdated]: newSingleValidationState,
      };
    });
  };

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      validationManager.setValidations(validation);
      validationManager.setDependencies(
        dependencyBetweenInputNameAndValidation
      );
    } else {
      const valuetoBeValidated = prepareValueObj(
        validationNames[user.hasChanged]
      );
      const validatedForm = validationManager.validate(
        user.hasChanged,
        valuetoBeValidated
      );
      updateSingleValidationInState(
        validatedForm,
        validationNames[user.hasChanged]
      );
    }

    if (users.registeredUsers.length === 0) {
      loadUsers();
    }
  }, [user]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
      hasChanged: name,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setValidation((prevState) => ({
      ...prevState,
      ["type"]:"submit"
    }));
  };

  return (
    <RegistrationForm
      user={user}
      onChange={onChangeHandler}
      validation={validation}
      onSubmit={onSubmit}
    />
  );
};

function mapStateToProps(state, ownProps) {
  return {
    users: state.users,
  };
}

const mapDispatchToProps = {
  loadUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageRegistrationForm);
