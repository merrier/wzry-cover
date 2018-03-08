import { combineReducers } from 'redux';
import * as home from './home';

export const rootReducer = combineReducers({
  home: combineReducers(home),
});

export default rootReducer;
