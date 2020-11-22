import React from 'react';
import PropTypes from 'prop-types';
import {withFormik} from 'formik';

const withFormikValidation = Component => props => {
    const {initialValues, validationSchema, validate, handleSubmit} = props;

    const EnhancedForm = withFormik({
      mapPropsToValues: () => initialValues,
      validationSchema: validationSchema,
      validate: props => {
        console.log(props)
      },
      handleSubmit: handleSubmit,
    })(Component);

    return (
        <EnhancedForm {...props}/>
    )
};

withFormikValidation.propTypes = {
    
};

export default withFormikValidation;