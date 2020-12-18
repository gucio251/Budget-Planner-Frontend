import React from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as Arrow} from 'assets/icons/arrowDashboardRight.svg';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  borderRadiusRemoved: {
    borderRadius: 0,
    height: `100%`
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    fontWeight: 500
  },
  pos: {
    marginBottom: 12,
  },
  paddingBottom0: {
    paddingBottom: 0,
    paddingTop: 0
  }
});


const DashboardDisplayWindow = ({children, title}) => {
    const classes = useStyles();
    return (
      <Card className={classes.borderRadiusRemoved}>
        <CardContent>
          <Typography className={classes.title}>{title}</Typography>
          {children}
        </CardContent>
        <CardActions className={classes.paddingBottom0}>
          <Grid container justify='flex-end' alignItems='center'>
            <Grid item xs={4}>
              {'See more'}
              <Arrow />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    );
};

DashboardDisplayWindow.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired
};

export default DashboardDisplayWindow;