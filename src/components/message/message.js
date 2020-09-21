import React from 'react';
import ReactEmoji from 'react-emoji';
import './message.css'

const Message = ({ message: { user, text }, name }) => {
  let isSendByCurrentUser = false;

  let currentuser = name.trim().toLowerCase();

  if (currentuser === user) {
    isSendByCurrentUser = true;
  }
  return (
    isSendByCurrentUser ? (
      <div className='messageContainer justifyEnd'>
        <p className='sentText pr-10'>{currentuser}</p>
        <div className='messageBox backgroundBlue'>
          <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    ) : (
        <div className='messageContainer justifyStart'>
          <div className='messageBox backgroundLight'>
            <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
          </div>
          <p className='sentText pl-10'>{user}</p>
        </div>
      )
  );
}

export default Message;