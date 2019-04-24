import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';
import { NavigationActions, withNavigation } from 'react-navigation';
import { func, shape } from 'prop-types';

const navigateToSettings = (navigation) => {
  const action = NavigationActions.navigate({
    routeName: 'Settings',
    params: {},
  });

  return navigation.dispatch(action);
};

const SettingsButton = (props) => (
  <Button
    transparent
    onPress={() => navigateToSettings(props.navigation)}
  >
    <Text>Settings</Text>
  </Button>
);
SettingsButton.displayName = 'SettingsButton';
SettingsButton.propTypes = {
  navigation: shape({ dispatch: func.isRequired }).isRequired,
};

export default withNavigation(SettingsButton);

