import React, {useRef, useEffect, useState, createContext} from 'react';
import gsap from 'gsap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as CloseSign } from 'assets/icons/closeSign.svg';


const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(180, 185, 217, 0.7);
  position: absolute;
  display: block;
  left: 0;
  z-index: 0;
`;

const StyledCloseSign = styled(CloseSign)`
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;

    &:hover {
        transform: scale(1.3);
    }
`

const StyledModal = styled.div`
    width: 500px;
    height: 100%;
    display: block;
    position: absolute;
    left: 42%;
    top: 15%;
    z-index: 1;
    border-radius: 100%;
`

export const ModalContext = React.createContext({});

const ModalProvider = ModalContext.Provider;

const Modal = ({children,show, setShow}) => {
    const modalBackground = useRef(null);
    const modalForm = useRef(null);

    const onEscapeClick = e => {
      if(e.keyCode === 27){
        setShow(false);
      }
    }

    useEffect(()=> {
      document.addEventListener('keydown', onEscapeClick);

      return ()=> {
        document.removeEventListener('keydown', onEscapeClick)
      }
    })
    useEffect(() => {
      const modalBackgroundEl = modalBackground.current.children[0];
      const modalFormEl = modalForm.current.children[0];

      gsap.set([modalBackgroundEl, ,modalFormEl], { autoAlpha: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut', reversed: false} });

      tl.fromTo(modalBackgroundEl,{y: -2000 }, {duration: 0.25, y: 0, autoAlpha: 1 }, "+=0.1")
          .fromTo(modalFormEl, {y:-2000}, {duration: 0.25, y: 0, autoAlpha: 1 })

      show === true ?  tl.play() : tl.progress(1).reverse();
    },[show]);

    return (
      <ModalProvider
        value={{
          show: show,
          setShow: setShow
        }}
      >
        <div ref={modalForm}>
          <StyledModal>
            {show && <StyledCloseSign onClick={() => setShow(false)} />}
            {show && children}
          </StyledModal>
        </div>
        <div ref={modalBackground}>
          <ModalWrapper onClick={() => setShow(false)} />
        </div>
      </ModalProvider>
    );
};

Modal.propTypes = {
    children: PropTypes.element.isRequired
};

export default Modal;