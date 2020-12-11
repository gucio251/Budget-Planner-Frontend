import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select, { components } from 'react-select';
import { Scrollbars } from 'react-custom-scrollbars';

const StyledSingleOption = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledOptionText = styled.div`
  color: #b5b4b9;
  margin-left: 15px;
`;

const SingleValueContainer = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.errorText};
`;

const IconWrapper = styled.div`
  transform: scale(0.6);
`;

const { Option, SingleValue } = components;

const renderScrollbar = (props) => {
  return (
    <div style={{ height: 150 }}>
      <Scrollbars>{props.children}</Scrollbars>
    </div>
  );
};

const CustomValueContainer = (props) => {
  const { options, data } = props;
  const { label } = data;

  if (label === '') {
    return <SingleValue {...props} />;
  }

  const [currentlyDisplayedOption] = options.filter(
    (option) => option.value === label
  );

  const Icon =
    typeof currentlyDisplayedOption !== 'undefined'
      ? currentlyDisplayedOption.Icon
      : '';

  return (
    <SingleValue {...props}>
      <SingleValueContainer>
        {Icon && (
          <IconWrapper>
            <Icon />
          </IconWrapper>
        )}
        <TextContainer>{label}</TextContainer>
      </SingleValueContainer>
    </SingleValue>
  );
};

const IconOption = (props) => {
  const { data } = props;
  return (
    <Option {...props}>
      <StyledSingleOption id={data.id}>
        {data.Icon && <data.Icon />}
        <StyledOptionText>{data.label}</StyledOptionText>
      </StyledSingleOption>
    </Option>
  );
};

const Dropdown = ({
  list,
  value,
  onChange,
  isSearchable,
  name,
  handleBlur,
  disabledWithoutOption,
}) => {
  return (
    <Select
      options={list}
      components={{
        Option: IconOption,
        SingleValue: CustomValueContainer,
      }}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      name={name}
      noOptionsMessage={() => null}
      disabledWithoutOption={disabledWithoutOption}
      styles={{
        dropdownIndicator: (provided, state) => ({
          ...provided,
          transform:
            !state.selectProps.menuIsOpen ||
            state.selectProps.disabledWithoutOption
              ? 'rotate(0deg)'
              : 'rotate(180deg)',
          color: state.selectProps.disabledWithoutOption
            ? '#75777F'
            : '#02AE9D',

          '&:active': {
            color: '#02AE9D',
          },
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          display: 'none',
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: '2',
        }),
        control: (provided, state) => ({
          ...provided,
          height: '40px',
          border: state.selectProps.menuIsOpen
            ? '1px solid #02AE9D'
            : '1px solid #D3D7DB',
          boxShadow: 'none',
          overflow: 'auto',
          backgroundColor: state.selectProps.disabledWithoutOption
            ? '#EFEFF3'
            : 'white',
          cursor: state.selectProps.disabledWithoutOption && 'not-allowed',

          '&:hover': {
            border: `1px solid ${
              state.selectProps.menuIsOpen ? '#02AE9D' : '#D3D7DB'
            }`,
          },
          option: (provided) => ({
            ...provided,

            '&hover': {
              backgroundColor: '#EFEFF3',
            },
          }),
        }),
      }}
    />
  );
};

Dropdown.propTypes = {};

export default Dropdown;
