import { handleActions } from 'redux-actions';
import update from 'updeep';


const A_1 = 'slack-wrapped/duck-1/A_1';
const A_2 = 'slack-wrapped/duck-1/A_2';

const initialState = {
  qaz: 42
};

const reducers = {
  [A_1]: (state) => {
    return update({
      qaz: state.qaz + 1
    }, state);
  },

  [A_2]: (state) => {
    return update({
    }, state);
  }
};

export function a1() {
  return {
    type: A_1
  };
}

export default handleActions(reducers, initialState);
