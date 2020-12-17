import styled from 'styled-components';

export const EmptyDiv = styled.div`
  grid-area: 'emptySpace';
`;

export const StyledOverview = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 48px 330px 375px;
  grid-template-areas:
    'welcomeTextArea dateMenu'
    'budgetSummary graphs'
    'aa aa';
  row-gap: 10px;
`;

export const WelcomeText = styled.span`
  grid-area: welcomeTextArea;
  font-size: 32px;
  font-weight: bold;
  padding: 0 5%;
  margin-top: 0;
`;

export const StyledDateMenu = styled.div`
  grid-area: dateMenu;
`;

export const StyledBudgetSummary = styled.div`
  grid-area: budgetSummary;
`;

export const StyledGraphArea = styled.div`
  grid-area: graphs;
`;

export const StyledAllTransactions = styled.div`
  grid-area: aa;
`;
