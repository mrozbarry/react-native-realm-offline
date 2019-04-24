import { combineReducers } from 'redux';

import navigation from './navigation';
import netInfo from './netInfo';
import messages from './messages';
import name from './name';
import input from './input';

export default combineReducers({
  navigation,
  netInfo,
  messages,
  name,
  input,
});
