import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Button from 'components/UI/Button';
import { modalActions } from 'redux/actions/modalActions';
import { incomesActions } from 'redux/actions/incomesActions';
import { expensesActions } from 'redux/actions/expensesActions';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(550px, 100vw);
  background-color: #f8f9fb;
  padding: 2em;
  border-radius: 4px;
`;

const Title = styled.h3`
    font-size: 18px;
    color: ${({theme}) => theme.dashboardBlack};
    font-weight: bold;
    margin-bottom: 20px;
`

const StyledContent = styled.p`
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 46px;
`;

const ButtonsRow = styled.div`
  display:flex;
  justify-content: flex-end;
`;

const OutlinedButton = styled.button`
  outline: none;
  width: 100%;
  background-color: white;
  color: ${({ theme }) => theme.mainBlue};
  font-size: 1em;
  border: ${({ theme }) => `2px solid ${theme.mainBlue}`};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  ${({theme}) => theme.devices.mobile}{
    height: 45px;
    margin-bottom: 1em;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 60%;
  gap: 20px;

  ${({theme}) => theme.devices.mobile}{
    display: block;
    width: 100%;
  }
`;

const getTransactionById = (allTransactions, id) => allTransactions.filter(transaction => transaction.id === id)

const DeleteTransactionContent = ({transaction, dispatch}) => {
  const {category, subcategory, id, type} = transaction;

  const handleDeletion = () => {
    dispatch(modalActions.close());
    type === 'income' ? dispatch(incomesActions.deleteSingle(id)) : dispatch(expensesActions.deleteSingle(id));
  }

  return (
    <Wrapper>
      <Title>Delete transaction</Title>
      <StyledContent>
        {`Are you sure you want to delete a transaction: ${category},
        ${subcategory}?`}
      </StyledContent>
      <ButtonsRow>
        <ButtonsWrapper>
          <OutlinedButton onClick={() => dispatch(modalActions.close())}>
            Cancel
          </OutlinedButton>
          <Button onClick={handleDeletion}>Delete</Button>
        </ButtonsWrapper>
      </ButtonsRow>
    </Wrapper>
  );
};

DeleteTransactionContent.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number,
    category: PropTypes.string,
    subcategory: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func,
}

export default connect((state)=> {
  let transaction;

  if (state.modalReducer.modalProps.type === 'expense') {
    [transaction] = getTransactionById(
      state.expenses.expenses,
      state.modalReducer.modalProps.id
    );
  } else {
    [transaction] = getTransactionById(
      state.incomes.incomes,
      state.modalReducer.modalProps.id
    );
  }
  return { transaction };
})(DeleteTransactionContent);