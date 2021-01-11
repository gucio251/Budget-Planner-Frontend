import styled from 'styled-components';

export const EmptyDiv = styled.div`
  grid-area: 'emptySpace';
`;

export const StyledOverview = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 50% 50%;
  grid-template-rows: 5% 45% 50%;
  grid-template-areas:
    'welcomeTextArea dateMenu'
    'budgetSummary graphs'
    'allTransactions allTransactions';
  row-gap: 10px;

  ${({ theme }) => theme.devices.tablet} {
    grid-template-rows: 8% 5% 40% 45%;
    grid-template-areas:
      'welcomeTextArea welcomeTextArea'
      'dateMenu dateMenu'
      'budgetSummary budgetSummary'
      'graphs graphs';
  }
`;

export const WelcomeText = styled.div`
  grid-area: welcomeTextArea;
  font-size: 2.0vw;
  font-weight: bold;
  margin-top: 0;

  ${({theme}) => theme.devices.tablet}{
    font-size: 4.0vw;
  }
`;

export const StyledDateMenu = styled.div`
  grid-area: dateMenu;
  display: flex;
  justify-content: space-between;
`;

export const StyledBudgetSummary = styled.div`
  grid-area: budgetSummary;
`;

export const StyledGraphArea = styled.div`
  grid-area: graphs;
`;

export const StyledAllTransactions = styled.div`
  grid-area: allTransactions;

  ${({ theme }) => theme.devices.tablet} {
    display: none;
  }
`;

export const StyledDropdown = styled.div`
  width: 30%
`
