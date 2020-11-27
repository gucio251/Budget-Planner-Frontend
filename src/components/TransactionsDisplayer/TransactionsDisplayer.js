import React, {useState} from 'react';
import withExpensesAndIncomes from 'hocs/withExpensesAndIncomes';
import { MemoizedSingleTransaction } from 'components/UI/SingleTransaction';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'components/Modal/Modal';
import DeleteTransactionContent from 'components/UI/DeleteTransactionContent';
import ModifyTransactionContent from 'components/ModifyTransactionContent/ModifyTransactionContent';
import {expensesActions} from 'redux/actions/expensesActions';
import {incomesActions} from 'redux/actions/incomesActions'
import {useDispatch, useSelector} from 'react-redux';
import validate from 'components/validate-yup/validate-yup';
import { validations } from 'components/validationSchemas-yup/validationSchemas-yup';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: '90%'
  },
});


const TransactionsDisplayer = ({transactionList = []}) => {
      const dispatch = useDispatch();
      const classes = useStyles();
      const expenseTypesState = useSelector((state) => state.expenseTypes);
      const incomeTypesState = useSelector((state) => state.incomeTypes);
      const [openDeleteModal, setOpenDeleteModal] = useState(false);
      const [openModifyModal, setOpenModifyModal] = useState(false)
      const [clickedElementData, setClickedElementData] = useState({})

      const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
      }

      const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
      }

      const handleOpenModifyModal = () => {
        setOpenModifyModal(true);
      }

      const handleCloseModifyModal = () => {
        setOpenModifyModal(false)
      }

      const onIconClickHandler = e => {
        handleOpenDeleteModal();
        const clickedTransactionId = parseInt(e.currentTarget.attributes.id.value);
        const transactionData =  transactionList.find(singleTransaction => singleTransaction.id === clickedTransactionId );
        setClickedElementData(transactionData);
      }

      const handleModifyIconClick = e => {
        handleOpenModifyModal();
        const clickedTransactionId = parseInt(e.currentTarget.attributes.id.value);
        const transactionData =  transactionList.find(singleTransaction => singleTransaction.id === clickedTransactionId );
        setClickedElementData(transactionData);
      }

      const deleteTransaction = () => {
        const {id, type} = clickedElementData;
        const token = localStorage.getItem('token');
        if(type === "income"){
          dispatch(incomesActions.deleteSingle(token, {id}));
        }else if(type === "expense"){
          dispatch(expensesActions.deleteSingle(token, { id }));
        }
        handleCloseDeleteModal();
      }

      const updateTransacton = (values) => {
        const { type } = clickedElementData;
        const token = localStorage.getItem('token');
        if(type === "income"){
          dispatch(incomesActions.update(token, values));
        }else if (type === "expense"){
          dispatch(expensesActions.update(token, values));
        }
        handleCloseModifyModal();
      }

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
            <ModifyTransactionContent
              categories={clickedElementData.type === 'income' ? incomeTypesState.incomeTypes : expenseTypesState.expenseTypes}
              initialValues={clickedElementData}
              validate={validate}
              validationSchema={validations.getTransactionAdditionValidationSchema}
              type={clickedElementData.type}
              handleSubmit={updateTransacton}
            />
          </Modal>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
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
                      transaction_date_converted,
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
                        transaction_date={transaction_date_converted}
                        comments={comments}
                        index={index}
                        type={type}
                        onIconClickHandler={onIconClickHandler}
                        handleModifyIconClick={handleModifyIconClick}
                      />
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      );
};

export default withExpensesAndIncomes(TransactionsDisplayer);