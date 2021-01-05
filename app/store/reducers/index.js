import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import reduxPersistConfig from '~/config/reduxPersist';

import app from './app';
import data from './data';
import session from './session';
import post from './post';

export default combineReducers({
  data: persistReducer(reduxPersistConfig.dataConfig, data),

  app,
  session,
  post,
});
