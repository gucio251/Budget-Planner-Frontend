import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const ValidationContainer = ({children, touched, errors, values}) => {
    debugger;
    const [fieldsInitialized, setFieldsInitialized] = useState({});
    const [fieldsCorrectness, setFieldsCorrectness] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if(Object.keys(values).length !== 0){
            const fieldsStatuses = Object.keys(values).reduce((finalStatus, currentFieldName) => {
                if(values[currentFieldName]!== ""){
                    return {
                        ...finalStatus,
                        [currentFieldName]: true
                    }
                }else{
                    return {
                        ...finalStatus
                    }
                }
            },{})
            setFieldsInitialized(fieldsStatuses);
        }
    }, [values])

    useEffect(()=> {
        if(Object.keys(fieldsInitialized).length !== 0 && Object.keys(errors).length === 0){
            const fieldsStatuses = Object.keys(values).reduce((finalValue, currentFieldName)=> {
                return {
                    ...finalValue,
                    [currentFieldName]: true
                }
            }, {});
            setButtonDisabled(false);
            setFieldsCorrectness(fieldsStatuses);
        }else if(Object.keys(fieldsInitialized).length !== 0){
            const fieldsStatuses = Object.keys(values).reduce((finalValue, currentFieldName) => {
                if(errors.hasOwnProperty(currentFieldName)){
                    return {
                        ...finalValue,
                        [currentFieldName] : false
                    }
                }else{
                    return {
                        ...finalValue,
                        [currentFieldName] : true
                    }
                }
            },{})
            if(buttonDisabled) setButtonDisabled(true);
            setFieldsCorrectness(fieldsStatuses);
        }
    }, [errors])


    return children({
        fieldsInitialized,
        fieldsCorrectness,
        buttonDisabled
    });
};

ValidationContainer.propTypes = {
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired
};

export default ValidationContainer;