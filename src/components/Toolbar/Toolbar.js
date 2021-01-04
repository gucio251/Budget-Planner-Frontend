import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import Button from 'components/UI/Button'
import {ReactComponent as AddSign} from 'assets/icons/addSignButton.svg';
import { ReactComponent as Avatar } from 'assets/icons/userAvatar.svg';
import { ReactComponent as ExpandArrow } from 'assets/icons/expandArrow.svg';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid'
import Modal from 'components/Modal/Modal'
import UserFeaturesList from 'components/UserFeaturesList/UserFeaturesList';
import TransactionHandlingForm from 'containers/TransactionHandlingForm/TransactionHandlingForm';
import Typography from '@material-ui/core/Typography';

import {getTodaysDate} from 'Utils/functions';

const ButtonItemsWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const UserSectionWrapper = styled.div`
  width: 60%;
  margin-left: 30px;
  display: flex;
  position: relative;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #1c245d;
  cursor: pointer;
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

const initialValues = {
  amount: 0,
  currency: '',
  currency_id: '',
  category: '',
  subcategory: '',
  category_id: '',
  transaction_date: getTodaysDate(),
  comments: '',
};


const TopToolbar = () => {
    const arrowWrapper = useRef(null);
    const classes = useStyles();
    const [openModal, setModalOpen] = useState(false);
    const [userFeatureListOpened, setUserFeatureListOpened] = useState(false);

    const handleModalOpen = () => {
      setModalOpen(true);
    }

    const handleModalClose = () => {
      setModalOpen(false);
    }

    useEffect(() => {
      const [elements] = arrowWrapper.current.children;
      const degreesToRotate = userFeatureListOpened ? "180_ccw" : "0_cw";
      gsap.to(elements, { rotation: degreesToRotate, duration: 0.25 });
    }, [userFeatureListOpened]);

    return (
      <>
        <Modal open={openModal} handleClose={handleModalClose}>
          <TransactionHandlingForm
            initialValues={initialValues}
            handleClose={handleModalClose}
          />
        </Modal>
        <AppBar position="relative" className={classes.root}>
          <Toolbar className={classes.toolbarRoot}>
            <Grid container justify="flex-end" alignItems="center">
              <Grid item xs={2}>
                <Button onClick={handleModalOpen} color="#2F54F3">
                  <ButtonItemsWrapper>
                    <AddSign />
                    <Typography className={classes.buttonSign}>
                      Add new transaction
                    </Typography>
                  </ButtonItemsWrapper>
                </Button>
              </Grid>
              <Grid item xs={2}>
                <UserSectionWrapper
                  onClick={() =>
                    setUserFeatureListOpened(!userFeatureListOpened)
                  }
                >
                  <Avatar />
                  <Typography className={classes.typographyRoot}>
                    Caroline
                  </Typography>
                  <div ref={arrowWrapper}>
                    <ExpandArrow />
                  </div>
                  {userFeatureListOpened && (
                    <UserFeaturesList setToggle={setUserFeatureListOpened} />
                  )}
                </UserSectionWrapper>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </>
    );
};

export default TopToolbar;