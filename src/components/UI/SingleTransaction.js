import React from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip'
import {ReactComponent as EditIcon} from 'assets/icons/editIconTable.svg'
import {ReactComponent as DeleteIcon} from 'assets/icons/deleteIconTable.svg'
import { makeStyles } from '@material-ui/core/styles';

const TableRow = styled.tr`
  border-bottom: 1px solid #efeff3;
  text-align: left;

  ${({ theme }) => theme.devices.mobile} {
    display: block;
  }
`;

const TableCell = styled.td`
  padding: 8px 0px;

  ${({ theme }) => theme.devices.mobile} {
    display: block;
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 100px;
    margin-left: 50px;

    &:before {
      position: absolute;
      top: 12px;
      left: 6px;
      width: 100px;
      padding-right: 40px;
      white-space: nowrap;
      margin-left: -50px;
    }

    &:nth-of-type(1):before {
      content: 'Date';
    }
    &:nth-of-type(2):before {
      content: 'Category';
    }
    &:nth-of-type(3):before {
      content: 'Subcategory';
    }
    &:nth-of-type(4):before {
      content: 'Details';
    }
    &:nth-of-type(5):before {
      content: 'Edit';
    }
    &:nth-of-type(6):before {
      content: 'Remove';
    }
    &:nth-of-type(7):before {
      content: 'Price';
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  & > *:first-child{
    margin-right: 0.5em;
  }
`
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
      <TableCell>{transaction_date}</TableCell>
      <TableCell>
        <Wrapper>
          <Svg />
          {category}
        </Wrapper>
      </TableCell>
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