import styled from 'styled-components';
import { ReactComponent as CloseSign } from 'assets/icons/closeSign.svg';

export const Content = styled.div`
  position: absolute;
  left: 33%;
  width: 33%;
  margin-top: 5%;
  display: flex;
  z-index: 3;
  flex-direction: column;
  align-items: center;
  max-height: 100%;
  background-color: #f8f9fb;
  transition: max-height 2s ease-in;
`;

export const StyledCloseSign = styled(CloseSign)`
  &:hover {
    transform: scale(1.3);
  }
`;

export const CloseSignWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 20px 20px 0 0;
`;

export const StyledTitle = styled.p`
  color: ${({ theme }) => theme.mainBlue};
  font-size: 20px;
  margin-top: 46px;
  width: 60%;
  display: flex;
  justify-content: flex-start;
`;

export const Wrapper = styled.div`
  width: 60%;
`;
