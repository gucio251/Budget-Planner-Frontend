import React, {useState, useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import DashboardDisplayWindow from 'components/DashboardDisplayWindow/DashboardDisplayWindow';
import {ReactComponent as AddIcon} from 'assets/icons/addIcon.svg';
import {expenseTypesActions} from 'redux/actions/expenseTypesActions';
import { currencyActions } from 'redux/actions/currencyActions';
import {incomeTypesActions} from 'redux/actions/incomeTypesActions';
import { incomesActions } from 'redux/actions/incomesActions';
import {expensesActions} from 'redux/actions/expensesActions';
import {Sidebar} from './../Sidebar/Sidebar';
import GraphAndStatsGroupedByType from 'components/GraphAndStatsGroupedByType/GraphAndStatsGroupedByType'
import AddTransactionContent from 'components/AddTransactionContent/AddTransactionContent';
import Modal  from 'components/Modal/Modal';

import Button from 'components/UI/Button';
import {ModalContext} from 'components/Modal/Modal'
import DashboardDateMenu from 'components/DashboardDateMenu/DashboardDateMenu';
import TransactionsDisplayer from 'components/TransactionsDisplayer/TransactionsDisplayer';
import BudgetSummary from 'components/BudgetSummary/BudgetSummary';
import DashboardMenu from 'components/DashboardMenu/DashboardMenu';

const StyledDashboard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: auto;
`;

const StyledReportsSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #F6F6F8;
`;

const WelcomeText = styled.span`
  width: 100%;
  font-size: 32px;
  font-weight: bold;
  padding: 0 5%;
  margin-top: 0;
`;

const StyledSideBar = styled.div`
  width: 180px;
  height: 100vh;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  padding: 0 5%;

  & > div:not(:last-child){
    margin-right: 20px;
  }
`;

const RowWithoutMargins = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const StyledDisplay = styled.div`
  height: 300px;
`

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const expenseTypes = useSelector(state => state.expenseTypes);
    const incomeTypes = useSelector((state) => state.incomeTypes);
    const currencies = useSelector(state => state.currencies);
    const expenses = useSelector (state => state.expenses);
    const incomes = useSelector (state => state.incomes);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(()=> {
        if(!expenseTypes.hasOwnProperty('expenseTypes')){
            dispatch(expenseTypesActions.load(localStorage.getItem('token')));
        }
    }, [expenseTypes.expenseTypes])

    useEffect(() => {
      if (!incomeTypes.hasOwnProperty('incomeTypes')) {
        dispatch(incomeTypesActions.load(localStorage.getItem('token')));
      }
    }, [incomeTypes.incomeTypes]);

    useEffect(()=> {
      if(!currencies.hasOwnProperty('currencies')){
          dispatch(currencyActions.loadCurrencies(localStorage.getItem('token')));
      }
    }, [currencies.currencies])

    useEffect(()=> {
      if(expenses.expenses.length === 0){
          dispatch(expensesActions.load(localStorage.getItem('token')));
      }
    }, [expenses.expenses])

    useEffect(() => {
      if (incomes.incomes.length === 0) {
        dispatch(incomesActions.load(localStorage.getItem('token')));
      }
    }, [incomes.incomes]);

    return (
      <StyledDashboard>
        <StyledSideBar>
          <Sidebar />
        </StyledSideBar>
        <StyledReportsSide>
          <RowWithoutMargins>
            <DashboardMenu handleButtonClick={handleOpen}/>
          </RowWithoutMargins>
          <Row>
            <Modal open={open} handleClose={handleClose}>
              <AddTransactionContent />
            </Modal>
          </Row>
            <WelcomeText>
              Hi Caroline, welcome back!
            </WelcomeText>
            <DashboardDateMenu />
          <Row>
            <BudgetSummary />
            <DashboardDisplayWindow title="Expenses and incomes">
              <StyledDisplay>
                <GraphAndStatsGroupedByType />
              </StyledDisplay>
            </DashboardDisplayWindow>
          </Row>
          <Row>
            <DashboardDisplayWindow title="Recent transactions">
              <StyledDisplay>
                <TransactionsDisplayer />
              </StyledDisplay>
            </DashboardDisplayWindow>
          </Row>
        </StyledReportsSide>
      </StyledDashboard>
    );
};

export {Dashboard};