import React, { Component } from 'react';
import { Text } from 'react-native';
import { StackActions, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import Layout from '../components/layout';

class Splash extends Component {
  static propTypes = {
    splash: bool.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (this.props.splash === true) {
      this.goToHome();
    }
  }

  goToHome() {
    console.log('spash.goToHome', this.props);
    if (!this.props.splash) return;

    this.props.navigation.dispatch(
      StackActions.replace({
        routeName: 'Home',
        params: {},
      }),
    );
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
    splash: state.splash,
  }),
)(withNavigation(Splash));


