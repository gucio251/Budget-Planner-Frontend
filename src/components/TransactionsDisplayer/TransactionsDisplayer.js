import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { modalActions } from 'redux/actions/modalActions'

import {
  RowContainer,
  Table,
  TableHeader,
  TableRow,
  HeaderField,
  LeftCenteredSpan,
  RightCenteredSpan,
  TableBody,
  DateFieldInRow,
  StyledDateText,
  CheckboxTd,
  Checkbox,
  Field,
  Wrapper,
  TextWrapper,
  MainText,
  MobileRow,
  Text,
  TextContainerMobile,
  StyledExpand,
  IconsWrapper
} from 'components/TransactionsDisplayer/TransactionDisplayer.styled'

import { ReactComponent as EditIcon } from 'assets/icons/editIconTable.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/deleteIconTable.svg';

import { getCategoryNameBySubcategoryId, getIconBySubcategoryId} from 'redux/reducers/expenseTypesReducer';

import {incomesActions} from 'redux/actions/incomesActions';
import {expensesActions} from 'redux/actions/expensesActions';


export const Displayer = ({ transactionList = {}, CurrencyIcon, withDeletion = false }) => {
  const [currentlyExpandedRow, setCurrentlyExpandedRow] = useState(null);
  const [selectionState, setSelectionState] = useState({
    isShiftDown: false,
    selectedItems: [],
    lastSelectedItem: null,
  });
  let index = 1;
  const incomeTypes = useSelector(state => state.incomeTypes.incomeTypes);
  const expenseTypes = useSelector((state) => state.expenseTypes.expenseTypes);
  const dispatch = useDispatch();

  const handleKeyUp = e => {
    if(e.key === 'Shift'&& selectionState.isShiftDown){
      setSelectionState({
        ...selectionState,
        isShiftDown: false
      })
    }
  };

  const returnIndex = () => {
    const currentIndex = index;
    index+=1;
    return currentIndex;
  }

  const handleKeyDown = e => {
    if (e.key === 'Shift' && !selectionState.isShiftDown) {
      setSelectionState({
        ...selectionState,
        isShiftDown: true,
      });
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('keydown', handleKeyDown);
    }
  })

  const handleItemsSelection = e => {
    const id = parseInt(e.target.closest('tr').dataset.id);

    const newSelectedItems = getNextValue(id);

    setSelectionState({
      ...selectionState,
      selectedItems: newSelectedItems,
      lastSelectedItem: id
    })
  }

  const getNextValue = value => {
    const {isShiftDown, selectedItems} = selectionState;
    const hasBeenSelected = !selectedItems.includes(value);

    if(isShiftDown){
      const newSelection = getNewSelection(value);
      const selections = [...new Set([...newSelection, ...selectedItems])];

      if(!hasBeenSelected){
        return selections.filter(item => !newSelection.includes(item));
      }

      return selections;
    }

    return selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];
  }

  const getNewSelection = value => {
    const {lastSelectedItem} = selectionState;
    const arrayBeginning = Math.min(lastSelectedItem, value);
    const arrayEnd = Math.max(lastSelectedItem, value) + 1;

    const arr = Array(arrayEnd)
      .fill()
      .map((x, i) => i);

    return arr.slice(arrayBeginning, arrayEnd);
  }

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
    dispatch(
      modalActions.open({
        modalType: 'DeleteTransactionContent',
        modalProps: { type, id },
      })
    );
  };

  const deleteMany = () => {
    const affectedElements = document.getElementsByTagName(`tr`);

    for (let item of affectedElements) {
      const fakeId = item.dataset.id;
      if(selectionState.selectedItems.includes(parseInt(fakeId))){
        const [id, type] = item.dataset.identifier.split('/');
        type === 'income'
          ? dispatch(incomesActions.deleteSingle(parseInt(id)))
          : dispatch(expensesActions.deleteSingle(parseInt(id)));
      }
    }

    setSelectionState(prevState => {
      return {
        ...prevState,
        selectedItems: []
      }
    })
  }

  const handleExpanding = e => {
    const closestTr = e.target.closest('tr');
    const id  = parseInt(closestTr.dataset.id);
    setCurrentlyExpandedRow((prevState) => {
      return prevState === id ? null : id;
    });
  }

  return (
    <>
      {Object.keys(transactionList).length === 0 ? null : (
        <>
          {withDeletion && (
            <RowContainer>
              {`${selectionState.selectedItems.length} selected`}
              <DeleteIcon onClick={deleteMany} />
            </RowContainer>
          )}
          <Table>
            <TableHeader withDeletionContent={withDeletion}>
              <TableRow withDeletionContent={withDeletion}>
                {withDeletion && <HeaderField></HeaderField>}
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
                  <RightCenteredSpan>Amount</RightCenteredSpan>
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
                        const tempId = returnIndex();
                        const active = tempId === currentlyExpandedRow;
                        return (
                          <TableRow
                            data-id={tempId}
                            data-identifier={`${id}/${type}`}
                            key={tempId}
                            active={active}
                            withDeletionContent={withDeletion}
                          >
                            {withDeletion && (
                              <CheckboxTd align="left">
                                <LeftCenteredSpan>
                                  <Checkbox
                                    type="checkbox"
                                    onClick={handleItemsSelection}
                                    checked={selectionState.selectedItems.includes(
                                      tempId
                                    )}
                                  />
                                </LeftCenteredSpan>
                              </CheckboxTd>
                            )}
                            <Field>
                              <Wrapper>
                                <Icon />
                                <TextWrapper>
                                  <MainText>{category}</MainText>
                                </TextWrapper>
                              </Wrapper>
                              <MobileRow active={active}>
                                <Text>{subcategory}</Text>
                              </MobileRow>
                            </Field>
                            <Field>{subcategory}</Field>
                            <Field>{comments}</Field>
                            <Field>
                              <EditIcon
                                onClick={() => handleUpdate({ id, type })}
                              />
                              <DeleteIcon
                                onClick={() => handleDeletion({ id, type })}
                              />
                            </Field>
                            <Field>
                              <RightCenteredSpan>
                                <TextContainerMobile>
                                  {`${type === 'expense' ? '-' : '+'}`}
                                  <CurrencyIcon />
                                  {amount.toFixed(2)}
                                </TextContainerMobile>
                                <StyledExpand
                                  onClick={handleExpanding}
                                  active={active}
                                />
                              </RightCenteredSpan>
                              <MobileRow active={active}>
                                <IconsWrapper>
                                  <EditIcon
                                    onClick={() => handleUpdate({ id, type })}
                                  />
                                  <DeleteIcon
                                    onClick={() => handleDeletion({ id, type })}
                                  />
                                </IconsWrapper>
                              </MobileRow>
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
        </>
      )}
    </>
  );
};

export default Displayer;