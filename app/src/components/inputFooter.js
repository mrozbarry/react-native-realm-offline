import React from 'react';
import { Input } from 'native-base';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';


const InputFooter = ({ name, input, inputChange, messageSubmit }) => (
  <Input
    placeholder={`${name} says...`}
    autoCapitalize="none"
    multiline={false}
    value={input}
    blurOnSubmit={false}
    onChangeText={inputChange}
    onSubmitEditing={() => messageSubmit(name, input, Date.now())}
    scrollEnabled
  />
);

InputFooter.propTypes = {
  name: string.isRequired,
  input: string,
	inputChange: func.isRequired,
	messageSubmit: func.isRequired,
};

export default connect(
  state => ({
    name: state.name,
    input: state.input,
  }),
  dispatch => ({
		inputChange: text => dispatch({ type: 'INPUT_CHANGE', text }),
		messageSubmit: (name, text, createdAt) => dispatch({ type: 'MESSAGE_SUBMIT', message: { text, name, createdAt } })
  }),
)(InputFooter);
