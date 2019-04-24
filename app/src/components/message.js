import React, { Component } from 'react';
import { Text } from 'react-native';
import { Body, ListItem, Right } from 'native-base';
import { number, shape, string } from 'prop-types';

const minute = 60000;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = week * 4;
const year = month * 12;

const pluralize = (number, noun, suffix) => {
  const singular = noun;
  const plural = `${noun}s`;
  const usage = number === 1 ? singular : plural;
  const count = number === 1 ? 'a' : number;
  return `${count} ${usage} ${suffix}`.trim();
};

const timeDeltas = { year, month, week, day, hour, minute };

const fuzzyTimeAgo = (time, now) => {
  const delta = now - time;
  const timeDelta = Object.keys(timeDeltas).find(t => delta >= timeDeltas[t]);
  return timeDelta
    ? pluralize(Math.floor(delta / timeDeltas[timeDelta]), timeDelta, 'ago')
    : 'Just now'
}

class Message extends Component {
  static propTypes = {
    message: shape({
      name: string,
      text: string.isRequired,
      createdAt: number,
    }),
  };

  state = { lastCheck: Date.now() };

  componentDidMount() {
    this.interval = setInterval(this.setLastCheck, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setLastCheck = () => {
    this.setState({ lastCheck: Date.now() });
  }

  render() {
    const { message } = this.props;
    const { lastCheck } = this.state;

    return (
      <ListItem>
        <Body>
          {message.name && (
            <Text>{message.name}</Text>
          )}
          <Text>{message.text}</Text>
        </Body>
        <Right footer>
          <Text note>{fuzzyTimeAgo(message.createdAt, lastCheck)}</Text>
        </Right>
      </ListItem>
    );
  }
}

export default Message;
