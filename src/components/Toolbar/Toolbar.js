import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import Button from 'components/UI/Button'
import {ReactComponent as AddSign} from 'assets/icons/addSignButton.svg';
import { ReactComponent as Avatar } from 'assets/icons/userAvatar.svg';
import { ReactComponent as ExpandArrow } from 'assets/icons/expandArrow.svg';

import Modal from 'components/Modal/Modal'
import UserFeaturesList from 'components/UserFeaturesList/UserFeaturesList';
import TransactionHandlingForm from 'containers/TransactionHandlingForm/TransactionHandlingForm';

import {getTodaysDate} from 'Utils/functions';

const Header = styled.header`
  height: 70px;
  margin-left: 180px;
  padding-right: 30px;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;

  ${({theme}) => theme.devices.tablet}{
    margin-left: 100px;
  }
`;

const Wrapper = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  gap: 15px;
`

const ButtonItemsWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const UserSectionWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  font-size: 16px;
  color: #1c245d;
  cursor: pointer;
`;



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
        <Header>
          <Wrapper>
            <Button onClick={handleModalOpen} color="#2F54F3">
              <ButtonItemsWrapper>
                <AddSign />
                Add new transaction
              </ButtonItemsWrapper>
            </Button>
            <UserSectionWrapper
              onClick={() => setUserFeatureListOpened(!userFeatureListOpened)}
            >
              <Avatar />
              Caroline
              <div ref={arrowWrapper}>
                <ExpandArrow />
              </div>
              {userFeatureListOpened && (
                <UserFeaturesList setToggle={setUserFeatureListOpened} />
              )}
            </UserSectionWrapper>
          </Wrapper>
        </Header>
      </>
    );
};

export default TopToolbar;