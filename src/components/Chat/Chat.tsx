import React, { useEffect, useState } from 'react';
import chatIcon from '../../images/ContacUsButton.svg';
import chatCss from './Chat.module.css';
import DefaultButton from '../DefaultButton/DefaultButton';

const apiKey = '3800850d95f0714043355b55b82bd6a0';
const socketUrl = `wss://socketsbay.com/wss/v2/1/${apiKey}`;

const Chat: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<string>('Connecting');

  const isValid: boolean = message.trim() !== '' && socket !== null;

  const handleToggleChat = () => {
    setIsChatOpen(prev => !prev);
  }

  const handleSendMessage = () => {
    if (socket !== null) {
      socket.send(message);
      setMessage('');
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  socket && (socket.onopen = () => {
    setStatus('Connected');
  });

  socket && (socket.onerror = () => {
    setStatus('Error');
  })

  socket && (socket.onmessage = event => {
    setMessageHistory(prev => [...prev, event.data]);
  })

  socket && (socket.onclose = () => {
    setStatus('Disconnected');
  })

  useEffect(() => {
    if (isChatOpen) {
      const socket: WebSocket = new WebSocket(socketUrl);
      setSocket(socket);
    } else {
      socket?.close()
    }
  }, [isChatOpen, socket])

  return (
    <div id={chatCss.chatWrap}>
      {isChatOpen ? (
        <div id={chatCss.chat}>
          <span>status: {status}</span>
          <input type="text" value={message} onChange={handleInputChange} />
          <DefaultButton disabled={!isValid} setState={handleSendMessage} button_text={'Send'} width={50} height={30} />
          <ul>
            {messageHistory.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      ) : (
        <img src={chatIcon} alt='chat' onClick={handleToggleChat} />
      )}
    </div>
  );
};

export default Chat;
