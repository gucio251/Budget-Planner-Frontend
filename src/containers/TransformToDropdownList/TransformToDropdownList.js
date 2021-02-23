import React from 'react';
import PropTypes from 'prop-types';

const convertToList = object => {
    if(Object.keys(object).length === 0) return [];

    return Object.keys(object).map(objectKey => {
        if (
          !object[objectKey].hasOwnProperty('id') ||
          !object[objectKey].hasOwnProperty('name')
        ) return {label: "", value: ""};

        return {
          label: object[objectKey].name,
          value: object[objectKey].id,
        }
    })
}

const TransformToDropdownList = ({children, objectToBeConverted}) => {
    const dropdownList = convertToList(objectToBeConverted);
    return children({
      dropdownList,
    });
};

TransformToDropdownList.propTypes = {
    
};

export default TransformToDropdownList;