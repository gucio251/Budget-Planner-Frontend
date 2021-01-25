import styled from 'styled-components';
import {Field} from 'formik'

export const StyledField = styled(Field)`
  height: 40px;
  width: 100%;
  background-color: white;
  border-radius: 4px;
  outline: none;
  border: none;
  font-size: 1em;
  color: ${({ theme }) => theme.dashboardBlack};
  padding-left: 1em;
`;

export default StyledField;