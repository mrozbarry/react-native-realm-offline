import { combineReducers } from 'redux';

import navigation from './navigation';
import splash from './splash';
import netInfo from './netInfo';
import apiHost from './apiHost';
import messages from './messages';
import name from './name';
import input from './input';

export default combineReducers({
  splash,
  navigation,
  netInfo,
  apiHost,
  messages,
  name,
  input,
});
