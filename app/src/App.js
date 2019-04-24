import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import reduxStore from './store';
import Router from './router';

YellowBox.ignoreWarnings([
	'Warning: componentWillUpdate',
	'Warning: componentWillMount',
	'Warning: componentWillReceiveProps',
])

export default class App extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <Router />
      </Provider>
    );
  }
}
