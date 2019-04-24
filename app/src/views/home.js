import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Content, Footer, Icon, List } from 'native-base';
import { arrayOf, number, oneOf, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import InputFooter from '../components/inputFooter';
import Message from '../components/message';


const HeaderIcon = ({ netInfo }) =>
  <Icon
    type="MaterialCommunityIcons"
    name={netInfo === 'connected' ? 'network-strength-3' : 'network-strength-off-outline'}
  />;

HeaderIcon.propTypes = {
  netInfo: oneOf(['undetermined', 'connected', 'disconnected']),
}

const ConnectedHeaderIcon = connect(
  state => ({ netInfo: state.netInfo }),
)(HeaderIcon);


class Home extends Component {
  static navigationOptions = {
    title: 'Messages',
    headerRight: <ConnectedHeaderIcon />,
    headerLeft: <Text />
  };

  static propTypes = {
    messages: arrayOf(shape({
      name: string,
      text: string,
      createdAt: number,
    }))
  };

  contentRef = React.createRef();

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      setTimeout(() => {
        this.contentRef.current.wrappedInstance.scrollToEnd({ animated: true });
      }, 250);
    }
  }

  render() {
    const { messages } = this.props;
    return (
      <Container>
        <Content ref={this.contentRef}>
          <List>
            {messages.map((message, index) => (
              <Message key={`${message.createdAt}-${index}`} message={message} />
            ))}
          </List>
        </Content>
        <Footer style={{ backgroundColor: '#ddd' }}>
          <InputFooter />
        </Footer>
      </Container>
    );
  }
}

export default connect(
  state => ({
    messages: state.messages,
  }),
)(Home);

