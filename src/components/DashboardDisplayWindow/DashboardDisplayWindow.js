import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ReactComponent as Arrow} from 'assets/icons/arrowDashboardRight.svg';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const StyledDashboardDisplayWindow = styled.section`
    width: 96%;
    background-color: white;
    margin: 0 24px 0 0px;
    padding: 22px 0 0 22px;
    font-size: 18px;
    font-weight: 600;
`

const TitleInfo = styled.div`
    display: flex;
    color: ${({theme}) => theme.dashboardBlack};
`
const StyledRedirectElement = styled.div`
  color: #2F54F3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  padding: 0 30px 20px 0;
`;

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
          <Typography>{children}</Typography>
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