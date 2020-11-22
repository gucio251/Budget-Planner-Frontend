import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from 'components/Modal/Modal';
import {
  Content,
  CloseSignWrapper,
  StyledCloseSign,
  StyledTitle,
  Wrapper,

} from 'components/AddTransactionContent/AddTransactionContent.styled';
import TransactionModifyForm from 'components/TransactionModifyForm/TransactionModifyForm';

const ModifyTransactionContent = ({categories, initialValues, validate, validationSchema, handleSubmit, type}) => {
    const Modal = useContext(ModalContext);
    return (
      <Content>
        <CloseSignWrapper>
          <StyledCloseSign onClick={Modal.handleClose} />
        </CloseSignWrapper>
          <StyledTitle>{`Modify ${type}`}</StyledTitle>
        <TransactionModifyForm
          categories={categories}
          initialValues={initialValues}
          validate={validate}
          validationSchema={validationSchema}
          handleSubmit={handleSubmit}
        />
      </Content>
    );
};

ModifyTransactionContent.propTypes = {
    
};

export default ModifyTransactionContent;