import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {ReactComponent as EditIcon} from 'assets/icons/editIconTable.svg'
import {ReactComponent as DeleteIcon} from 'assets/icons/deleteIconTable.svg'
import { withStyles } from '@material-ui/core/styles';


const StyledTableCell = withStyles(() => ({
  body: {
    fontSize: 16,
    fontFamily: 'Rubik',
    color: '#282C43',
  },
}))(TableCell);



const SingleTransaction = ({ type, id, category, Svg, subcategory, amount, comments, transaction_date, index, init, handleExpanding, expanded, expandedAreaNeeded}) => {


    return (
      <TableRow key={id}>
        <StyledTableCell style={{ fontWeight: 'bold'}}>
          {transaction_date}
        </StyledTableCell>
        <StyledTableCell align="left">
          <Svg />
        </StyledTableCell>
        <StyledTableCell>{category}</StyledTableCell>
        <StyledTableCell>{subcategory}</StyledTableCell>
        <StyledTableCell>{comments}</StyledTableCell>
        <StyledTableCell align="right">
          <EditIcon />
        </StyledTableCell>
        <StyledTableCell>
          <DeleteIcon />
        </StyledTableCell>
        <StyledTableCell>{`${type === 'expense' ? '-' : '+'}$${amount.toFixed(2)}`}</StyledTableCell>
      </TableRow>
    );
};

SingleTransaction.propTypes = {
    
};

export const MemoizedSingleTransaction = React.memo(SingleTransaction);