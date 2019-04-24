import React from 'react';
import { Text } from 'react-native';
import { Button, Icon } from 'native-base';
import { NavigationActions, withNavigation } from 'react-navigation';
import { func, shape } from 'prop-types';

const navigateBack = (navigation) => {
  const action = NavigationActions.back();
  return navigation.dispatch(action);
}

const BackButton = (props) => (
  <Button
    iconLeft
    transparent
    onPress={() => navigateBack(props.navigation)}
  >
    <Icon name='arrow-back' />
    <Text>Back</Text>
  </Button>
);
BackButton.displayName = 'BackButton';
BackButton.propTypes = {
  navigation: shape({ dispatch: func.isRequired }).isRequired,
};

export default withNavigation(BackButton);

