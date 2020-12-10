import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'components/UI/Button'
import {ReactComponent as AddSign} from 'assets/icons/addSignButton.svg';
import { ReactComponent as Avatar } from 'assets/icons/userAvatar.svg';
import { ReactComponent as ExpandArrow } from 'assets/icons/expandArrow.svg';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';


const ButtonItemsWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const UserSectionWrapper = styled.div`
  padding-left: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #1c245d;
`;

const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: 'none',
  },
  toolbarRoot: {
    backgroundColor: 'white',
  },
  typographyRoot: {
    color: 'black',
    fontSize: 16
  },
  buttonSign: {
    fontSize: 16,
    fontWeight: 500,
  }
});



const TopToolbar = ({handleButtonClick}) => {
    const classes = useStyles();
    return (
      <AppBar position="relative" className={classes.root}>
        <Toolbar className={classes.toolbarRoot}>
          <Grid container justify="flex-end" alignItems="center">
            <Grid item xs={2}>
              <Button onClick={() => handleButtonClick(true)} color="#2F54F3">
                <ButtonItemsWrapper>
                  <AddSign />
                  <Typography className={classes.buttonSign}>Add new transaction</Typography>
                </ButtonItemsWrapper>
              </Button>
            </Grid>
            <Grid item xs={3}>
              <UserSectionWrapper>
                <Avatar />
                <Typography className={classes.typographyRoot}>
                  Caroline
                </Typography>
                <ExpandArrow />
              </UserSectionWrapper>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
};

TopToolbar.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
};

export default TopToolbar;