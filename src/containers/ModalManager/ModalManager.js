import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'components/Modal/Modal';
import DeleteTransactionContent from 'components/UI/DeleteTransactionContent';
import TransactionHandlingForm from 'containers/TransactionHandlingForm/TransactionHandlingForm';
import CustomRangePicker from 'containers/CustomRange/CustomRange';

const modalsLookupTable = {
    TransactionHandlingForm,
    DeleteTransactionContent,
    CustomRangePicker
}

const mapState = state => {return {currentModal: state.modalReducer}};

const ModalManager = ({currentModal}) => {
    let renderedModal = null;

    if(currentModal.modalType !== null){
        const ModalComponent = modalsLookupTable[currentModal.modalType];

        renderedModal = <ModalComponent />

        return <Modal>{renderedModal}</Modal>;
    }

    return null;
};

ModalManager.propTypes = {
};

export default connect(mapState, null, null, {forwardRef: true})(ModalManager);