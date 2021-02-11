import { modalConstants } from 'redux/actions/actionTypes';

const initialState = {
  modalType: null,
  modalProps: null,
};

const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case modalConstants.MODAL_OPEN:
      const { modalType, modalProps={}} = payload;
      return {
        ...state,
        modalType,
        modalProps,
      };
    case modalConstants.MODAL_CLOSE:
      return {
        ...state,
        modalType: payload,
        modalProps: payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
