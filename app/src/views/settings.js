import React, { Component } from 'react';
import { Text } from 'react-native';
import { Body, Container, Content, Left, List, ListItem } from 'native-base';
import SettingsInput from '../components/settingsInput';
// import { connect } from 'react-redux';

class Settings extends Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <Container>
        <Content ref={this.contentRef}>
          <List>
            <ListItem thumbnail>
              <Left><Text>Api Host</Text></Left>
              <Body><SettingsInput placeholder="Leave empty for localhost" attr="apiHost" messageType="APIHOST_SET" /></Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Settings;
