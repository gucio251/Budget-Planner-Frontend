import React, {useState} from 'react';
import withExpensesAndIncomes from 'hocs/withExpensesAndIncomes';
import { MemoizedSingleTransaction } from 'components/UI/SingleTransaction';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: '90%'
  },
});


const TransactionsDisplayer = ({transactionList = []}) => {
      const classes = useStyles();
    
      return (
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
                      type
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
                      />
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
      );
};

export default withExpensesAndIncomes(TransactionsDisplayer);