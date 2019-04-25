import React from 'react';
import { Input } from 'native-base';
import { func, object, string } from 'prop-types';
import { connect } from 'react-redux';


const SettingsInput = ({ placeholder, attr, messageType, state, dispatch }) => (
  <Input
    placeholder={placeholder}
    autoCapitalize="none"
    multiline={false}
    value={state[attr]}
    onChangeText={value => dispatch({ type: messageType, value })}
    scrollEnabled
  />
);

SettingsInput.propTypes = {
  placeholder: string,
  attr: string.isRequired,
  messageType: string.isRequired,
  state: object,
  dispatch: func.isRequired,
};

export default connect(
  state => ({
    state,
  }),
  dispatch => ({
    dispatch,
  }),
)(SettingsInput);

