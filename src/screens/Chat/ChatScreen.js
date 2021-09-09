import React, {useState, useCallback, Component, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
const data = [
  {
    _id: 1,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 2,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
];

export default class OurLocation extends Component {
  onSend(messages) {
    GiftedChat.append(data, messages);
  }
  render() {
    return (
      <GiftedChat
        messages={data}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
    );
  }
}
