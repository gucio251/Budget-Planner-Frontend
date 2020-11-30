import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import CountUp from 'react-countup';

const useStyles = makeStyles({
  root: {
    height: 186,
  },
  media:{
    height: 40,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'normal',
  },
  nameHolder: {
    fontSize: 12,
  },
});

const SingleSummaryField = ({children, amount, name}) => {
    const classes = useStyles();
    return (
      <Card>
        <CardContent className={classes.root}>
          <CardMedia className={classes.media}>
            {children}
          </CardMedia>
          <Typography className={classes.amount}>
            <CountUp
              className="account-balance"
              start={0}
              end={amount}
              duration={2.75}
              useEasing={true}
              useGrouping={true}
              separator="."
              prefix="$"
              decimals={0}
            />
          </Typography>
          <Typography className={classes.nameHolder}>
            {name}
          </Typography>
        </CardContent>
      </Card>
    );
};

SingleSummaryField.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  amount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default SingleSummaryField;