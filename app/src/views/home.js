import React, { Component } from 'react';
import { Container, Content, Footer, List } from 'native-base';
import { arrayOf, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import InputFooter from '../components/inputFooter';
import Message from '../components/message';
import NetInfoIcon from '../components/netInfoIcon';
import SettingsButton from '../components/settingsButton';


class Home extends Component {
  static navigationOptions = {
    headerLeft: <NetInfoIcon />,
    title: 'Messages',
    headerRight: <SettingsButton />,
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
    if (prevProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom();
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.contentRef.current.wrappedInstance.scrollToEnd({ animated: true });
    }, 50);
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

