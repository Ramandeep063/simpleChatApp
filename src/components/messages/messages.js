import React from 'react';
import './messages.css'
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../message/message';

const Messages = (props) => {
  return (
    <ScrollToBottom clasName='messages'>
      {props.messages.map((item, i) => {
        return (
          <div key={i}>
            <Message
              message={item}
              name={props.name}
            />
          </div>
        )
      })}
    </ScrollToBottom>
  );
}

export default Messages;