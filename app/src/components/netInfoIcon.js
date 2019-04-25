import React from 'react';
import { Icon } from 'native-base';
import { oneOf } from 'prop-types';
import { connect } from 'react-redux';

const NetInfoIcon = ({ netInfo }) =>
  <Icon
    type="MaterialCommunityIcons"
    name={netInfo === 'connected' ? 'network-strength-3' : 'network-strength-off-outline'}
  />;

NetInfoIcon.propTypes = {
  netInfo: oneOf(['undetermined', 'connected', 'disconnected']),
}

export default connect(
  state => ({ netInfo: state.netInfo }),
)(NetInfoIcon);

