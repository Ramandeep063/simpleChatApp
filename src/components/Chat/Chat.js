import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import Infobar from '../infoBar/infoBar';
import './Chat.css';
import Input from '../input/input';
import Messages from '../messages/messages';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [particularRoomData, setParticularRoomData] = useState([]);
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const ENDPOINT = 'https://react-chat-chatty.herokuapp.com/';
  const ENDPOINT = 'localhost:5000';


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.connect();
    console.log(socket.connected);
    socket.addEventListener('connect', () => {
      console.log('listerner listening');
      if (socket.connected) {
        socket.emit('join', { name, room }, () => {
          console.log('join emitted');
        });
      }
    });

    return () => {
      console.log('functional component unmounts');
      socket.emit('disconnect');
      socket.removeAllListeners();
      socket.off();
    }
  }, [location.search, ENDPOINT]);

  useEffect(() => {
    socket.on('message', (mesage) => {
      setMessages([...messages, mesage]);
    });
    socket.on('roomData', (message) => {
      if (typeof particularRoomData.find(item => item.roomName.trim().toLowerCase() === message.room.trim().toLowerCase()) === 'undefined') {
        setParticularRoomData([...particularRoomData, { roomName: message.room, users: message.users }])
      } else {
        let roomIndex = particularRoomData.findIndex(item => item.roomName.trim().toLowerCase() === message.room.trim().toLowerCase())
        if (roomIndex >= 0) {
          let prevRoomData = [...particularRoomData];
          prevRoomData[roomIndex].users = [...message.users];
          setParticularRoomData(prevRoomData);
        }
      }
    })
  }, [messages, particularRoomData]);

  const sendMessage = (evt) => {
    evt.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => {
        console.log('called');
        setMessage('');
        console.log(message);
      });
    }
  }

  return (
    <div className='outerContainer'>
      <div className='container'>
        <Infobar
          roomName={room}
        />
        <Messages
          messages={messages}
          name={name}
        />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>

      {/* <div
        className='usersContainer'>
        {
          particularRoomData.map((roomData, i) => {
            return (
              <div key={i}>
                <h2>{roomData.roomName}</h2>
                {roomData.users.map((userData, j) => {
                  return (
                    <div key={j}>
                      {userData.name}
                    </div>
                  )
                })}
              </div>
            )
          })
        }
      </div> */}
    </div>
  );
}

export default Chat;