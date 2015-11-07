import { handleActions } from 'redux-actions';
import update from 'updeep';


const A_1 = 'slack-wrapped/duck-1/A_1';

const initialState = {
};

const reducers = {
  [A_1]: (state) => {
    return update({
    }, state);
  }
};

export default handleActions(reducers, initialState);
