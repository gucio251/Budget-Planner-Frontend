import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {ReactComponent as EmptyStateIcon} from 'assets/icons/emptyStateIcon.svg';
import Button from 'components/UI/Button';
import {modalActions} from 'redux/actions/modalActions';

const StyledContainer = styled.section`
    width: 100%;
    height: 100%;
    margin-left: 180px;
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

const WelcomeStateDashboard = () => {
    const login = useSelector((state) => state.login.login);
    const dispatch = useDispatch();

    return (
        <StyledContainer>
            <Header>{`Hi ${login}, welcome!`}</Header>
            <MiddleContainer>
            <EmptyStateIcon />
            <MainInfo>No data to analyze yet</MainInfo>
            <Text>
                Add first transaction and start analysing your spendings
            </Text>
            <ButtonWrapper>
                <Button
                onClick={() =>
                    dispatch(
                    modalActions.open({ modalType: 'TransactionHandlingForm' })
                    )
                }
                >
                Add first transaction
                </Button>
            </ButtonWrapper>
            </MiddleContainer>
        </StyledContainer>
    );
};

export default WelcomeStateDashboard;