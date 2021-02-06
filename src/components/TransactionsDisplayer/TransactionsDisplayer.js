import React, {useState} from 'react';
import styled from 'styled-components';
import { MemoizedSingleTransaction } from 'components/UI/SingleTransaction';
import Modal from 'components/Modal/Modal';
import DeleteTransactionContent from 'components/UI/DeleteTransactionContent';
import {expensesActions} from 'redux/actions/expensesActions';
import {incomesActions} from 'redux/actions/incomesActions'
import {useDispatch} from 'react-redux';
import TransactionHandlingForm from 'containers/TransactionHandlingForm/TransactionHandlingForm';
import {
  convertDate,
} from 'Utils/functions';

import { ReactComponent as EditIcon } from 'assets/icons/editIconTable.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/deleteIconTable.svg';

const Table = styled.table`
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
`;

const HeaderField = styled.th`
  padding: 10px 0;
  color: #7a7d8a;
  width: 20%;
  font-weight: normal;
  border-bottom: 2px solid #d0c9d6;

  ${({theme}) => theme.devices.tablet}{
    width: 25%;
  }
`;

const LeftCenteredSpan = styled.span`
  width: 100%;
  display: flex;
  justify-content: flex-start;

`

const TableBody = styled.tbody`

`;

const TableRow = styled.tr`
  & > td:first-child,
  & > th:first-child {
    padding-left: 1.5em;
  }

  & > td:last-child,
  & > th:last-child {
    padding-right: 1.5em;
  }

  ${({ theme }) => theme.devices.tablet} {
    & > td:nth-child(2),
    & > th:nth-child(2) {
      display: none;
    }
  }

  ${({ theme }) => theme.devices.mobile} {
    & > td:nth-child(3),
    & > th:nth-child(3),
    & > td:nth-child(4),
    & > th:nth-child(4) {
      display: none;
    }

    & > td:first-child,
    & > th:first-child {
      padding-left: 0.5em;
    }

    & > td:last-child,
    & > th:last-child {
      padding-right: 0.5em;
    }
  }
`;

const DateFieldInRow = styled.td`
  padding: 0.5em 0;
  width: 100%;
  border-bottom: 1px solid #d0c9d6;
`;

const StyledDateText = styled.span`
  display: flex;
  justify-content: center;
  font-size: 1.1em;
  font-weight: 500;

`;

const Field = styled.td`
  width: 20%;
  padding: 10px 0px;
  border-bottom: 1px solid #d0c9d6;

  ${({ theme }) => theme.devices.tablet} {
    width: 25%;
  }
`;

const RightCenteredSpan = styled.span`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  display: flex;
`;

const TextWrapper = styled.div`
  margin-left: 1em;
`;

const MainText = styled.p`
  font-size: 1em;
`;

const Text = styled.p`
  font-size: 0.7em;
`;


export const Displayer = ({ transactionList = {}, CurrencyIcon }) => {
  const dispatch = useDispatch();
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
  const [modifyModalVisibility, setModifyMobileVisibility] = useState(false);
  const [clickedElementData, setClickedElementData] = useState({});

  const handleDeleteModalVisibility = () => {
    setDeleteModalVisibility(prevState => !prevState);
  };

  const handleModifyModalVisibility = () => {
    setModifyMobileVisibility(prevState => !prevState);
  };

  const onIconClickHandler = (e) => {
    handleDeleteModalVisibility();
    const clickedTransactionId = parseInt(e.currentTarget.attributes.id.value);
    const transactionData = transactionList.find(
      (singleTransaction) => singleTransaction.id === clickedTransactionId
    );
    setClickedElementData(transactionData);
  };

  const handleModifyIconClick = (e) => {
    handleModifyModalVisibility();
    const clickedTransactionId = parseInt(e.currentTarget.attributes.id.value);
    const transactionData = transactionList.find(
      (singleTransaction) => singleTransaction.id === clickedTransactionId
    );
    setClickedElementData(transactionData);
  };

  const deleteTransaction = () => {
    const { id, type } = clickedElementData;
    if (type === 'income') {
      dispatch(incomesActions.deleteSingle(id));
    } else if (type === 'expense') {
      dispatch(expensesActions.deleteSingle(id));
    }
    handleDeleteModalVisibility();
  };

  return (
    <>
      <Modal
        open={deleteModalVisibility}
        handleClose={handleDeleteModalVisibility}
      >
        <DeleteTransactionContent
          category={clickedElementData.category}
          subcategory={clickedElementData.subcategory}
          submitHandler={deleteTransaction}
        />
      </Modal>
      <Modal
        open={modifyModalVisibility}
        handleClose={handleModifyModalVisibility}
      >
        <TransactionHandlingForm
          initialValues={clickedElementData}
          handleClose={handleModifyModalVisibility}
        />
      </Modal>
      {Object.keys(transactionList).length === 0 ? null : (
        <Table>
          <TableHeader>
            <TableRow>
              <HeaderField>
                <LeftCenteredSpan>DESCRIPTION</LeftCenteredSpan>
              </HeaderField>
              <HeaderField>
                <LeftCenteredSpan>COMMENT</LeftCenteredSpan>
              </HeaderField>
              <HeaderField>
                <LeftCenteredSpan>EDIT</LeftCenteredSpan>
              </HeaderField>
              <HeaderField>
                <LeftCenteredSpan>DELETE</LeftCenteredSpan>
              </HeaderField>
              <HeaderField>
                <RightCenteredSpan>AMOUNT</RightCenteredSpan>
              </HeaderField>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(transactionList).map((transaction_date) => {
              return (
                <>
                  <TableRow>
                    <DateFieldInRow colSpan="100%">
                      <StyledDateText>{transaction_date}</StyledDateText>
                    </DateFieldInRow>
                  </TableRow>
                  <>
                    {transactionList[transaction_date].map((transaction) => {
                      const {
                        Icon,
                        category,
                        subcategory,
                        comments,
                        amount,
                        type,
                      } = transaction;
                      return (
                        <TableRow>
                          <Field>
                            <Wrapper>
                              <Icon />
                              <TextWrapper>
                                <MainText>{category}</MainText>
                                <Text>{subcategory}</Text>
                              </TextWrapper>
                            </Wrapper>
                          </Field>
                          <Field>{comments}</Field>
                          <Field>
                            <EditIcon />
                          </Field>
                          <Field>
                            <DeleteIcon />
                          </Field>
                          <Field>
                            <RightCenteredSpan>
                              {`${type === 'expense' ? '-' : '+'}`}
                              <CurrencyIcon />
                              {amount.toFixed(2)}
                            </RightCenteredSpan>
                          </Field>
                        </TableRow>
                      );
                    })}
                  </>
                </>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default Displayer;