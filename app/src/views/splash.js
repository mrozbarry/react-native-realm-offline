import React, { Component } from 'react';
import { Text } from 'react-native';
import { StackActions, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { func, object, string } from 'prop-types';
import Layout from '../components/layout';

class Splash extends Component {
  static propTypes = {
    initializeApp: func.isRequired,
    navigation: object.isRequired,
    netInfo: string.isRequired,
  };

  componentDidMount() {
    this.props.initializeApp(this.props.navigation);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.netInfo !== this.props.netInfo) {
      this.props.navigation.dispatch(
        StackActions.replace({
          routeName: 'Home',
          params: {},
        }),
      );
    }
  }

  render() {
    return (
      <Layout>
        <Text>Loading</Text>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    netInfo: state.netInfo,
  }),
  dispatch => ({
    initializeApp: navigation => dispatch({
      type: 'INITIALIZE_APPLICATION',
      navigation,
    }),
  })
)(withNavigation(Splash));


