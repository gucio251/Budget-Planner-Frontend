import React from 'react';
import styled from 'styled-components';
import {Field} from 'formik'

export const StyledField = styled(Field)`
  height: 40px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.lightGray};
  background-color: white;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.errorText};
  padding-left: 8px;

  &:focus {
    border: 1px solid ${({ theme }) => theme.darkMint};
  }

`;

export default StyledField;