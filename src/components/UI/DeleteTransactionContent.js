import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/UI/Button';
import {ModalContext} from 'components/Modal/Modal';
import OutlinedButton from 'components/UI/OutlinedButton';

const Wrapper = styled.div`
  position: absolute;
  top: 35%;
  left: 35%;
  width: 30%;
  background-color: #F8F9FB;
  padding: 25px;
`;

const Title = styled.h3`
    font-size: 18px;
    color: ${({theme}) => theme.dashboardBlack};
    font-weight: bold;
    margin-bottom: 20px;
`

const StyledContent = styled.p`
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 46px;
`;

const ButtonsRow = styled.div`
  display:flex;
  justify-content: flex-end;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 60%;
  gap: 20px;
`;


const DeleteTransactionContent = ({category, subcategory, submitHandler}) => {
    const Modal = useContext(ModalContext);
    return (
      <Wrapper>
        <Title>Delete transaction</Title>
        <StyledContent>
          {`Are you sure you want to delete a transaction: ${category},
          ${subcategory}?`}
        </StyledContent>
        <ButtonsRow>
          <ButtonsWrapper>
            <OutlinedButton size="large" onClick={Modal.handleClose}>Cancel</OutlinedButton>
            <Button color="#1665D8" onClick={submitHandler}>Delete</Button>
          </ButtonsWrapper>
        </ButtonsRow>
      </Wrapper>
    );
};

DeleteTransactionContent.propTypes = {
  category: PropTypes.string,
  subcategory: PropTypes.string,
  submitHandler: PropTypes.func,
};

DeleteTransactionContent.defaultProps = {
  category: '',
  subcategory: '',
  submitHandler: () => {},
};
export default DeleteTransactionContent;