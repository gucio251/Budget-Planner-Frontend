import styled from 'styled-components';

export const EmptyDiv = styled.div`
  grid-area: 'emptySpace';
`;

export const StyledOverview = styled.div`
  display: grid;
  margin: 15px 40px 0 230px;
  grid-template-columns: 47% 52%;
  grid-template-rows: 0.2fr 1fr 1.1fr;
  grid-template-areas:
    'welcomeTextArea dateMenu'
    'budgetSummary graphs'
    'allTransactions allTransactions';
  row-gap: 10px;

  ${({ theme }) => theme.devices.tablet} {
    margin: 0 0 30px 150px;
    grid-template-rows: 8% 5% 30% 65%;
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
  align-items: flex-end;
`;

export const StyledBudgetSummary = styled.div`
  grid-area: budgetSummary;
`;

export const StyledGraphArea = styled.div`
  grid-area: graphs;
  display: flex;
`;

export const StyledAllTransactions = styled.div`
  grid-area: allTransactions;
  display: flex;

  ${({ theme }) => theme.devices.tablet} {
    display: none;
  }
`;

export const StyledDropdown = styled.div`
  width: 30%
`
