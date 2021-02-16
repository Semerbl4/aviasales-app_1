import { combineReducers } from 'redux';

import filter from './filterReducer';
import mainReducer from './mainReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  mainReducer,
  filter,
  errorsReducer,
});
