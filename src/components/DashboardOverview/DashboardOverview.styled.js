import styled from 'styled-components';

export const StyledOverview = styled.div`
  padding: 1em;
  margin-left: 180px;

  ${({ theme }) => theme.devices.tablet} {
    margin-left: 100px;
  }

  ${({ theme }) => theme.devices.mobile} {
    margin-left: 0;
    margin-bottom: 10px;
    padding: 2em 0;
  }

  & > * {
    margin-bottom: 1em;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;


  ${({theme}) => theme.devices.tablet}{
    flex-direction: column;
  }
`
export const WelcomeText = styled.div`
  font-weight: bold;
  font-size: 2em;
  padding: 0 0 1em 0;
  display: flex;
  align-items: flex-start;

  ${({ theme }) => theme.devices.mobile} {
    display: none;
  }
`;

export const StyledDateMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const RowWithoutSpaceBetween = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 0.5em;
  }

  ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;

    & > *:not(:first-child) {
      margin-top: 0.5em;
    }
  }
`;

export const StyledDropdown = styled.div`
  width: 100px;
`
