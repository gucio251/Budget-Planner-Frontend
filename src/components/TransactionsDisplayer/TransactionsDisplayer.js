import React, {useState} from 'react';
import withExpensesAndIncomes from 'hocs/withExpensesAndIncomes';
import { MemoizedSingleTransaction } from 'components/UI/SingleTransaction';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'components/Modal/Modal';
import DeleteTransactionContent from 'components/UI/DeleteTransactionContent';
import {expensesActions} from 'redux/actions/expensesActions';
import {useDispatch} from 'react-redux';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: '90%'
  },
});


const TransactionsDisplayer = ({transactionList = []}) => {
      const dispatch = useDispatch();
      const classes = useStyles();
      const [open, setOpen] = useState(false);
      const [clickedElementData, setClickedElementData] = useState({})

      const handleClose = () => {
        setOpen(false);
      }

      const handleOpen = () => {
        setOpen(true);
      }

      const onIconClickHandler = e => {
        handleOpen();
        const clickedTransactionId = parseInt(e.currentTarget.attributes.id.value);
        const transactionData =  transactionList.find(singleTransaction => singleTransaction.id === clickedTransactionId );
        setClickedElementData(transactionData);
      }

      const deleteTransaction = (id) => {
        dispatch(expensesActions.deleteSingle(localStorage.getItem('token'), {id}));
        handleClose();
      }


      return (
        <>
          <Modal open={open} handleClose={handleClose}>
            <DeleteTransactionContent
              id={clickedElementData.id}
              category={clickedElementData.category}
              subcategory={clickedElementData.subcategory}
              submitHandler={deleteTransaction}
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
                        transaction_date={transaction_date}
                        comments={comments}
                        index={index}
                        type={type}
                        openDeleteModal={handleOpen}
                        onIconClickHandler={onIconClickHandler}
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