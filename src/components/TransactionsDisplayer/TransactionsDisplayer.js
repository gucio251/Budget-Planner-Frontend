import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import { modalActions } from 'redux/actions/modalActions'

import { ReactComponent as EditIcon } from 'assets/icons/editIconTable.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/deleteIconTable.svg';

import { getCategoryNameBySubcategoryId, getIconBySubcategoryId} from 'redux/reducers/expenseTypesReducer';

const Table = styled.table`
  border-collapse: collapse;
  position: relative;
  width: 100%;
`;

const TableHeader = styled.thead`
`;

const HeaderField = styled.th`
  padding: 10px 0;
  color: ${({ theme }) => theme.dashboardBlack};
  width: 20%;
  font-weight: 450;
  border-bottom: 1px solid #efeff3;

  ${({ theme }) => theme.devices.tablet} {
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
  border-bottom: 1px solid #EFEFF3;
  background-color: #EFEFF3;
`;

const StyledDateText = styled.span`
  display: flex;
`;

const Field = styled.td`
  width: 20%;
  padding: 10px 0px;
  border-bottom: 1px solid #efeff3;

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
  align-items: center;
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
  const incomeTypes = useSelector(state => state.incomeTypes.incomeTypes);
  const expenseTypes = useSelector((state) => state.expenseTypes.expenseTypes);
  const dispatch = useDispatch();

  const getFullDataForTransaction = transaction => {
    let category, subcategory, Icon;
    const id = parseInt(transaction.transaction_type_id);
    if (transaction.type === 'income') {
      category = getCategoryNameBySubcategoryId(id, incomeTypes);
      subcategory = incomeTypes.subcategories[id].name;
      Icon = getIconBySubcategoryId(id, incomeTypes);
    } else {
      category = getCategoryNameBySubcategoryId(id, expenseTypes);
      subcategory = expenseTypes.subcategories[id].name;
      Icon = getIconBySubcategoryId(id, expenseTypes);
    }

    return {
      ...transaction,
      category,
      subcategory,
      Icon
    }
  };


  const handleUpdate = ({ type, id }) => {
    dispatch(
      modalActions.open({
        modalType: 'TransactionHandlingForm',
        modalProps: { type, id },
      })
    );
  };

  const handleDeletion = ({ type, id }) => {
    console.log('handle');
    dispatch(
      modalActions.open({
        modalType: 'DeleteTransactionContent',
        modalProps: { type, id },
      })
    );
  };

  return (
    <>
      {Object.keys(transactionList).length === 0 ? null : (
        <Table>
          <TableHeader>
            <TableRow>
              <HeaderField>
                <LeftCenteredSpan>Category</LeftCenteredSpan>
              </HeaderField>
              <HeaderField>
                <LeftCenteredSpan>Subcategory</LeftCenteredSpan>
              </HeaderField>
              <HeaderField>
                <LeftCenteredSpan>Details</LeftCenteredSpan>
              </HeaderField>
              <HeaderField>
                <LeftCenteredSpan>Action</LeftCenteredSpan>
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
                        id,
                        Icon,
                        category,
                        subcategory,
                        comments,
                        amount,
                        type,
                      } = getFullDataForTransaction(transaction);
                      return (
                        <TableRow>
                          <Field>
                            <Wrapper>
                              <Icon />
                              <TextWrapper>
                                <MainText>{category}</MainText>
                              </TextWrapper>
                            </Wrapper>
                          </Field>
                          <Field>{subcategory}</Field>
                          <Field>{comments}</Field>
                          <Field>
                            <EditIcon
                              onClick={() =>
                                handleUpdate({ id, type })
                              }
                            />
                            <DeleteIcon
                              onClick={() => handleDeletion({ id, type })}
                            />
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