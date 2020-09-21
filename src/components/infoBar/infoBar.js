import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './infoBar.css';

const Infobar = (props) => {
  return (
    <div className='infoBar'>
      <div className='leftInnerContainer'>
        <img src={onlineIcon} alt='online' />
        <h3>{props.roomName}</h3>
      </div>
      <div className='rightInnerContainer'>
        <a href='/'>
          <img src={closeIcon} alt='close' />
        </a>
      </div>
    </div>
  )
}

export default Infobar;