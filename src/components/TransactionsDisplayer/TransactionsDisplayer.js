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
  sortTransactionsByChosenProperty,
} from 'Utils/functions';

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

const Table = styled.table`
  width: 95%;
  height: 90%;
  border-collapse: collapse;
`;

const TableBody = styled.tbody`

`

const TransactionsDisplayer = ({ expenses, incomes, CurrencyIcon }) => {
  return <Displayer transactionList={getSortedTransactions([].concat(expenses, incomes))} CurrencyIcon={CurrencyIcon} />;
}


const Displayer = ({ transactionList = [], CurrencyIcon }) => {
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [clickedElementData, setClickedElementData] = useState({});

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleOpenModifyModal = () => {
    setOpenModifyModal(true);
  };

  const handleCloseModifyModal = () => {
    setOpenModifyModal(false);
  };

  const onIconClickHandler = (e) => {
    handleOpenDeleteModal();
    const clickedTransactionId = parseInt(e.currentTarget.attributes.id.value);
    const transactionData = transactionList.find(
      (singleTransaction) => singleTransaction.id === clickedTransactionId
    );
    setClickedElementData(transactionData);
  };

  const handleModifyIconClick = (e) => {
    handleOpenModifyModal();
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
    handleCloseDeleteModal();
  };

  return (
    <>
      <Modal open={openDeleteModal} handleClose={handleCloseDeleteModal}>
        <DeleteTransactionContent
          category={clickedElementData.category}
          subcategory={clickedElementData.subcategory}
          submitHandler={deleteTransaction}
        />
      </Modal>
      <Modal open={openModifyModal} handleClose={handleCloseModifyModal}>
        <TransactionHandlingForm
          initialValues={clickedElementData}
          handleClose={handleCloseModifyModal}
        />
      </Modal>
      <Wrapper>
        <Table>
          <TableBody>
            {transactionList.map(
              (
                {
                  id,
                  category,
                  Icon,
                  subcategory,
                  amount,
                  comments,
                  transaction_date,
                  type,
                },
                index
              ) => {
                return (
                  <MemoizedSingleTransaction
                    id={id}
                    key={id}
                    category={category}
                    Svg={Icon}
                    subcategory={subcategory}
                    amount={amount}
                    transaction_date={convertDate(transaction_date)}
                    comments={comments}
                    index={index}
                    type={type}
                    onIconClickHandler={onIconClickHandler}
                    handleModifyIconClick={handleModifyIconClick}
                    CurrencyIcon={CurrencyIcon}
                  />
                );
              }
            )}
          </TableBody>
        </Table>
      </Wrapper>
    </>
  );
};

const getSortedTransactions = props => {
  return sortTransactionsByChosenProperty(props, 'transaction_date').slice(0,4);
}

export default TransactionsDisplayer;