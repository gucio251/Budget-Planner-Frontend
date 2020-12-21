import React, {useState} from 'react';
import styled from 'styled-components';
import {ReactComponent as EmptyStateIcon} from 'assets/icons/emptyStateIcon.svg';
import Button from 'components/UI/Button'
import Modal from 'components/Modal/Modal'
import TransactionHandlingForm from 'containers/TransactionHandlingForm/TransactionHandlingForm';
import { getTodaysDate } from 'Utils/functions';

const StyledContainer = styled.section`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 24% 37% 39%;
    grid-template-rows: 10% 90%;
    grid-template-areas:
        'header header .'
        '. container .';
`;

const Header = styled.h1`
    grid-area: header;
    font-size: 32px;
    color: black;
`

const MiddleContainer = styled.div`
    grid-area: container;
    display: flex;
    flex-direction: column;
    align-items: center;

`

const MainInfo = styled.h3`
    margin: 35px 0 10px 0;
    font-size: 24px;
`

const Text = styled.p`
    font-size: 16px;
    margin-bottom: 43px;
`

const ButtonWrapper = styled.div`
    display: flex;
    width: 60%;
`

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

const WelcomeStateDashboard = () => {
    const [openModal, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <>
        <Modal open={openModal} handleClose={handleModalClose}>
          <TransactionHandlingForm initialValues={initialValues} handleClose={handleModalClose}/>
        </Modal>
        <StyledContainer>
            <Header>
                Hi Caroline, welcome!
            </Header>
            <MiddleContainer>
                <EmptyStateIcon />
                <MainInfo>
                    No data to analyze yet
                </MainInfo>
                <Text>
                    Add first transaction and start analysing your spendings
                </Text>
                <ButtonWrapper>
                    <Button color="#2F54F3" onClick={handleModalOpen}>
                        Add first transaction
                    </Button>
                </ButtonWrapper>
            </MiddleContainer>
        </StyledContainer>
        </>
    );
};

export default WelcomeStateDashboard;