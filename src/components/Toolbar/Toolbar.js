import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import gsap from 'gsap';
import Button from 'components/UI/Button'
import { ReactComponent as AddSign } from 'assets/icons/addSignButton.svg';
import { ReactComponent as Avatar } from 'assets/icons/userAvatar.svg';
import { ReactComponent as ExpandArrow } from 'assets/icons/expandArrow.svg';

import Modal from 'components/Modal/Modal'
import UserFeaturesList from 'components/UserFeaturesList/UserFeaturesList';
import TransactionHandlingForm from 'containers/TransactionHandlingForm/TransactionHandlingForm';

import {getTodaysDate} from 'Utils/functions';

const MobileButtonWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.devices.mobile} {
    display: block;
  }
`;
const Header = styled.header`
  height: 70px;
  margin-left: 180px;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  padding-right: 3.5em;

  ${({ theme }) => theme.devices.tablet} {
    margin-left: 100px;
  }

  ${({ theme }) => theme.devices.mobile} {
    display: none;
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
    const login = useSelector(state => state.login.login);
    const arrowWrapper = useRef(null);
    const [modalVisibility,setModalVisiblity] = useState(false);
    const [userFeatureListOpened, setUserFeatureListOpened] = useState(false);

    const handleModalVisiblity = () => {setModalVisiblity(prevState => {
      return !prevState;
    })}

    useEffect(() => {
      const [elements] = arrowWrapper.current.children;
      const degreesToRotate = userFeatureListOpened ? "180_ccw" : "0_cw";
      gsap.to(elements, { rotation: degreesToRotate, duration: 0.25 });
    }, [userFeatureListOpened]);

    return (
      <>
        <MobileButtonWrapper>
          {renderButton(handleModalVisiblity)}
        </MobileButtonWrapper>
        <Modal open={modalVisibility} handleClose={handleModalVisiblity}>
          <TransactionHandlingForm
            initialValues={initialValues}
            handleClose={handleModalVisiblity}
          />
        </Modal>
        <Header>
          <Wrapper>
            {renderButton(handleModalVisiblity)}
            <UserSectionWrapper
              onClick={() => setUserFeatureListOpened(!userFeatureListOpened)}
            >
              <Avatar />
              {`${login}`}
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

const renderButton = (handleModalVisiblity) => {
  return (
    <Button onClick={handleModalVisiblity}>
      <ButtonItemsWrapper>
        <AddSign />
        Add new transaction
      </ButtonItemsWrapper>
    </Button>
  );
};
export default TopToolbar;