import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Grow from '@material-ui/core/Grow';
import Modal from '@material-ui/core/Modal';

export const ModalContext = React.createContext({});

const ModalProvider = ModalContext.Provider;

const useStyles = makeStyles(() => ({
  backDrop: {
    background: 'rgba(180, 185, 217, 0.7)',
  },
}));

const ModalTemplate = ({children, open=true}) => {
    const classes = useStyles();

    return (
      <ModalProvider
        value={{
          open: open
        }}
      >
        <Modal
          open={open}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            classes: {
              root: classes.backDrop
            }
          }}
        >
          <Grow in={open}>
            {children}
          </Grow>
        </Modal>
      </ModalProvider>
    );
};

ModalTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ModalTemplate;