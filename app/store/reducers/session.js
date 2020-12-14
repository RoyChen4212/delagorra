import Immutable from 'seamless-immutable';

import { createReducer } from '~/store/redux';
import { AuthTypes } from '~/store/actions/auth';

const INITIAL_STATE = Immutable({
  user: null,
  token: null,
});

const signInSuccess = (state, { payload }) => state.merge({ user: payload.user, token: payload.token });

const signInFailure = () => INITIAL_STATE;

const updatePasswordSuccess = (state, { payload }) => state.merge({ user: { ...state.user, ...payload.user } });

const HANDLERS = {
  [AuthTypes.SIGN_IN_SUCCESS]: signInSuccess,
  [AuthTypes.SIGN_IN_FAILURE]: signInFailure,
  [AuthTypes.UPDATE_PASSWORD_SUCCESS]: updatePasswordSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS, {
  resetOn: [AuthTypes.LOG_OUT_SUCCESS],
});
