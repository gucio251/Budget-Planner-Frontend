import styled from 'styled-components';
import { ReactComponent as AddSign } from 'assets/icons/addIcon.svg';

export const StyledForm = styled.form`
  margin-top: 30px;
  margin-bottom: 59px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  position: relative;
`;

export const InputFieldWrapper = styled.div`
  width: 55%;
  position: relative;
`;

export const DropdownWrapper = styled.div`
  width: 35%;
  position: relative;
  z-index: 1;
`;

export const RowWithMargins = styled.div`
  margin-top: 25px;
  position: relative;
`;

export const RowWithMarginForHigherInput = styled.div`
  height: 80px;
  margin-top: 25px;
  margin-bottom: 50px;
  position: relative;
`;

export const StyledAddIcon = styled(AddSign)`
  fill: ${({ theme, disabled }) => (disabled ? theme.darkGray : 'white')};
`;
