import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import RegistrationForm from "./RegistrationForm";
import { emailValidation, passwordValidation, repeatedPasswordValidation} from "./manageRegistrationFormData";
import { loadUsers, addUser } from "../../redux/actions/userActions";
import { validationManager } from "../../components/validationManager/validationManager";


const ManageRegistrationForm = ({ loadUsers, users, addUser }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const [firstRender, setFirstRender] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formCorrectness, setFormCorrectness] = useState(false);

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

  const prepareValueToValidation = (validationName) => {
    const { email, password, repeatedPassword } = validationNames;
    let value = {};
    switch (validationName) {
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

  const performSingleFieldValidation = () => {
    const fieldModified = user.lastModifiedField;
    const result = performSingleValidation(fieldModified);
    const validationName = Object.keys(result)[0];
    const validatedObj = Object.values(result)[0];
    setValidation((prevState) => {
      return {
        ...prevState,
        [validationName]: validatedObj,
      };
    });
  }

  const performSingleValidation = (modifiedFieldName) => {
    const valuetoBeValidated = prepareValueToValidation(
      validationNames[modifiedFieldName]
    );

    return validationManager.validate(modifiedFieldName, valuetoBeValidated);
  };

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      validationManager.configureInitialSetup(validation,dependencyBetweenInputNameAndValidation,prepareValueToValidation);
    } else {
      performSingleFieldValidation();
    }

    if (users.registeredUsers.length === 0) {
      loadUsers();
    }
  }, [user]);

  useEffect(() => {
    if(isFormSubmitted){
      const [finalResult, isFormCorrect ] = validationManager.submitForm(user, validationNames);

      setValidation(finalResult);
      setFormCorrectness(isFormCorrect);

      isFormCorrect === true ? addUser(user) : setIsFormSubmitted(false);
    }
  }, [isFormSubmitted])

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
      lastModifiedField: name,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);
  };

  return (
    <RegistrationForm
      user={user}
      onChange={onChangeHandler}
      validation={validation}
      onSubmit={onSubmit}
      formCorrectness={formCorrectness}
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
  addUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageRegistrationForm);
