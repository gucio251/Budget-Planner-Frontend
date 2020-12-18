import React, {useEffect} from 'react';
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

const ModalTemplate = ({children, open, handleClose}) => {
    const classes = useStyles();
    const onEscapeClick = e => {
      if(e.keyCode === 27){
        handleClose()
      }
    }

    useEffect(()=> {
      document.addEventListener('keydown', onEscapeClick);

      return ()=> {
        document.removeEventListener('keydown', onEscapeClick)
      }
    })

    return (
      <ModalProvider
        value={{
          open: open,
          handleClose: handleClose,
        }}
      >
        <Modal
          open={open}
          onClose={handleClose}
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
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ModalTemplate;