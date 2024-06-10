import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

interface Message {
    author: string;
    text: string;
}

interface ChatProps {
    socket: SocketIOClient.Socket; // Tipo específico do seu socket, substitua conforme necessário
}

const Chat: React.FC<ChatProps> = ({ socket }) => {
    const messageRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLInputElement>(null);

    const [messageList, setMessageList] = useState<Message[]>([]);

    useEffect(() => {
        const handleMessageReceive = (data: Message) => {
            console.log(data);
            setMessageList((current) => [...current, data]);
        };

        socket.on('receive_message', handleMessageReceive);

        return () => {
            socket.off('receive_message', handleMessageReceive);
        };
    }, [socket]);

    useEffect(()=>{
        scrollDown()
      }, [messageList])    

    const handleSubmit = () => {
        if (messageRef.current) {
            const message = messageRef.current.value;
            if (!message.trim()) return;

            socket.emit('message', message);
            clearInput();
            focusInput()
        }
    };

    const clearInput = () => {
        if (messageRef.current) {
            messageRef.current.value = '';
        }
    };

    const focusInput = () => {
        messageRef.current.focus()
      }
      
      const getEnterKey = (e) => {
        if(e.key === 'Enter')
          handleSubmit()
      }
    
      const scrollDown = () => {
        bottomRef.current.scrollIntoView({behavior: 'smooth'})
      }

    return (
        <div>
            <Box>
                <div className='chat-body'>
                    {messageList.map((message, index) => (
                        <div className={`${["message-container"]} ${message.authorId === socket.id && ["message-mine"]}`} key={index}>
                            <div className="message-author"><strong>{message.author}</strong></div>
                            <div className="message-text">{message.text}</div>
                        </div>
                        
                    ))}
                    <div ref={bottomRef} />
                    </div>
                    <div className='send'>
                        <div className="messageBox">
                            <input ref={messageRef} placeholder="Message..." type="text" id="messageInput" onKeyDown={(e)=>getEnterKey(e)} />
                            <button id="sendButton" onClick={handleSubmit}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                                <path
                                    fill="none"
                                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                                ></path>
                                <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    stroke-width="33.67"
                                    stroke="#6c6c6c"
                                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                                ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
            </Box>
        </div>
    );
};

const Box = styled.div`
    height: 550px;
    width: 450px;
    background-color: #272727;

    .send{
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        display:flex;
        align-items: center;
        bottom: 0;
        height: 50px;
    }

    .chat-body{
        padding: 0 10px;
        height: 550px;
        overflow-y: scroll;
        color: #000;
        display: flex;
        flex-direction: column;
    }

    .message-container{
        max-width: 250px;
        width: fit-content;
        background-color: lightgrey;
        margin-top: 10px;
        padding: 5px 10px;
        border-radius: 7px;
        align-self: start;
        font-family: monospace;
        text-align: left;
}       
    .message-author{
        font-size: 19px;
        
    }
    .message-mine{
        align-self: end;
        background-color: skyblue;
        font-family: monospace;
    }

    .messageBox {
        width: fit-content;
        height: 40px;
        width: 570px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #2d2d2d;
        padding: 0 10px;
        border-radius: 10px;
        border: 1px solid rgb(63, 63, 63);
    }
    .messageBox:focus-within {
        border: 1px solid rgb(110, 110, 110);
    }

.tooltip {
  position: absolute;
  top: -40px;
  display: none;
  opacity: 0;
  color: white;
  font-size: 10px;
  text-wrap: nowrap;
  background-color: #000;
  padding: 6px 10px;
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.596);
  transition: all 0.3s;
}
#messageInput {
  width: 200px;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  padding-left: -100px;
  color: white;
}
#messageInput:focus ~ #sendButton svg path,
#messageInput:valid ~ #sendButton svg path {
  fill: #3c3c3c;
  stroke: white;
}

#sendButton {
  width: fit-content;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-left: 140px;
}
#sendButton svg {
  height: 18px;
  transition: all 0.3s;
}
#sendButton svg path {
  transition: all 0.3s;
}
#sendButton:hover svg path {
  fill: #3c3c3c;
  stroke: white;
}
`;

export default Chat;
