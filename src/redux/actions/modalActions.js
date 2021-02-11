import { modalConstants } from 'redux/actions/actionTypes';


const open = payload => {
    return {
        type: modalConstants.MODAL_OPEN,
        payload
    }
}

const close = () => {
    return {
        type: modalConstants.MODAL_CLOSE,
        payload: null
    }
};

export const modalActions = {
    open,
    close
}