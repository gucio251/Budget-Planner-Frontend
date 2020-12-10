import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';

const useStyles = makeStyles({
  primary: {
    fontSize: '16px'
  },
});

const GroupedTransactionsDisplayer = ({transactions}) => {
  const classes = useStyles();
  return (
    <List>
      {transactions.map(({ Icon, name }, index) => (
        <ListItem>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText
            primary={name}
            classes={{primary: classes.primary}}/>
        </ListItem>
      ))}
    </List>
  );
};

GroupedTransactionsDisplayer.propTypes = {
    
};

export default GroupedTransactionsDisplayer;