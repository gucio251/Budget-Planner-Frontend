import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip'
import {ReactComponent as EditIcon} from 'assets/icons/editIconTable.svg'
import {ReactComponent as DeleteIcon} from 'assets/icons/deleteIconTable.svg'
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.gray,
  },
  tooltip: {
    backgroundColor: theme.palette.common.gray,
    fontSize: '12px'
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}


const StyledTableCell = withStyles(() => ({
  body: {
    fontSize: 16,
    fontFamily: 'Rubik',
    color: '#282C43',
  },
}))(TableCell);



const SingleTransaction = ({
  type,
  id,
  category,
  Svg,
  subcategory,
  amount,
  comments,
  transaction_date,
  openDeleteModal,
  onIconClickHandler
}) => {
  return (
    <TableRow key={id}>
      <StyledTableCell style={{ fontWeight: 'bold' }}>
        {transaction_date}
      </StyledTableCell>
      <StyledTableCell align="left">
        <Svg />
      </StyledTableCell>
      <StyledTableCell>{category}</StyledTableCell>
      <StyledTableCell>{subcategory}</StyledTableCell>
      <StyledTableCell>{comments}</StyledTableCell>
      <StyledTableCell align="right">
        <BootstrapTooltip title="Edit">
          <EditIcon />
        </BootstrapTooltip>
      </StyledTableCell>
      <StyledTableCell>
        <BootstrapTooltip title="Delete">
          <DeleteIcon id={id} type={type} onClick={onIconClickHandler} />
        </BootstrapTooltip>
      </StyledTableCell>
      <StyledTableCell>{`${type === 'expense' ? '-' : '+'}$${amount.toFixed(
        2
      )}`}</StyledTableCell>
    </TableRow>
  );
};

SingleTransaction.propTypes = {
    
};

export const MemoizedSingleTransaction = React.memo(SingleTransaction);