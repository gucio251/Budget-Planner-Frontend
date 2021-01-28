import { mobileViewConstants } from 'redux/actions/actionTypes';

const initialState = {
  onlyWorkingViewVisible:false
};

const mobileView = (state = initialState, { type, payload }) => {
  switch (type) {
    case mobileViewConstants.SETONLYWORKINGSCREENVISIBLE:
      return {
        ...state,
        onlyWorkingViewVisible: payload,
      };

    default:
      return state;
  }
};

export default mobileView;
