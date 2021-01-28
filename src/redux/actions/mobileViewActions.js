import { mobileViewConstants } from 'redux/actions/actionTypes';

const setWorkingViewVisible = () => {
    return {
      type: mobileViewConstants.SETONLYWORKINGSCREENVISIBLE,
      payload: true,
    };

};

export const mobileViewActions = {
  setWorkingViewVisible,
};
