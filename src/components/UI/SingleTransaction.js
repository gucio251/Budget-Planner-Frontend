import React from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip'
import {ReactComponent as EditIcon} from 'assets/icons/editIconTable.svg'
import {ReactComponent as DeleteIcon} from 'assets/icons/deleteIconTable.svg'
import { makeStyles } from '@material-ui/core/styles';

const TableRow = styled.tr`
  border-bottom: 1px solid #efeff3;
  text-align: left;

    & > *:first-child {
      font-weight: 600;
    }
`;

const TableCell = styled.td`
  padding: 8px 0px;
`;

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


const SingleTransaction = ({
  type,
  id,
  category,
  Svg,
  subcategory,
  amount,
  comments,
  transaction_date,
  onIconClickHandler,
  handleModifyIconClick,
  CurrencyIcon
}) => {
  return (
    <TableRow key={id}>
      <TableCell>
        {transaction_date}
      </TableCell>
      <TableCell align="left">
        <Svg />
      </TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{subcategory}</TableCell>
      <TableCell>{comments}</TableCell>
      <TableCell align="right">
        <BootstrapTooltip title="Edit">
          <EditIcon id={id} type={type} onClick={handleModifyIconClick} />
        </BootstrapTooltip>
      </TableCell>
      <TableCell>
        <BootstrapTooltip title="Delete">
          <DeleteIcon id={id} type={type} onClick={onIconClickHandler} />
        </BootstrapTooltip>
      </TableCell>
      <TableCell>
        {`${type === 'expense' ? '-' : '+'}`}
        <CurrencyIcon />
        {amount.toFixed(2)}
      </TableCell>
    </TableRow>
  );
};

SingleTransaction.propTypes = {
    
};

export const MemoizedSingleTransaction = React.memo(SingleTransaction);