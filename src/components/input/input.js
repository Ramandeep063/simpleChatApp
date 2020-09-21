import React from 'react';
import './input.css'

const Input = (props) => {
  return (
    <form className='form'>
      <input
        className='input'
        type='text'
        placeholder='type message...'
        value={props.message}
        onChange={(evt) => props.setMessage(evt.target.value)}
        onKeyPress={(evt) => evt.key === 'Enter' ? props.sendMessage(evt) : null}
      />
      <button className='sendButton' onClick={(evt) => props.sendMessage(evt)} >Send</button>
    </form>
  );
}

export default Input;