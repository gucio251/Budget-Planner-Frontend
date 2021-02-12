import React, {useRef} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { modalActions } from 'redux/actions/modalActions';
import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
import Modal from '@material-ui/core/Modal';

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  border: none;
`;

const useStyles = makeStyles(() => ({
  backDrop: {
    background: 'rgba(180, 185, 217, 0.7)',
  },
}));

const ModalTemplate = ({children, open=true}) => {
    const dispatch = useDispatch();
    const modalContentRef = useRef(null);
    const classes = useStyles();

    const clickOutsideHandler = (e) => {
      if (!modalContentRef.current.contains(e.target)) dispatch(modalActions.close())
    }

    return (
      <Modal
        onClick={clickOutsideHandler}
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <Content ref={modalContentRef}>
          <Grow in={open}>{children}</Grow>
        </Content>
      </Modal>
    );
};

ModalTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ModalTemplate;