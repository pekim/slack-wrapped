import { handleActions } from 'redux-actions';
import update from 'updeep';


const TOGGLE_ABOUT = 'slack-wrapped/modals/TOGGLE_ABOUT';
const HIDE_ALL = 'slack-wrapped/modals/HIDE_ALL';

const initialState = {
  showAbout: false
};

const reducers = {
  [TOGGLE_ABOUT]: (state) => {
    return update({
      showAbout: !state.showAbout
    }, state);
  },

  [HIDE_ALL]: (state) => {
    return update({
      showAbout: false
    }, state);
  }
};

export function toggleAbout() {
  return {
    type: TOGGLE_ABOUT
  };
}

export function hideAll() {
  return {
    type: HIDE_ALL
  };
}

export default handleActions(reducers, initialState);
