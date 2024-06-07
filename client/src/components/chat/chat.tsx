import React,{useRef, useState} from 'react';

interface ChatProps {
    socket: any; // Altere 'any' para o tipo correto do seu socket, se disponível
}

const Chat: React.FC<ChatProps> = ({socket}) => {
    const messageRef = useRef();
    const [messageList, setMessageList] = useState([])

    const handleSubmit = () => {
        const message = messageRef.current.value;
        if(!message.trim()) return;

        socket.emit('message', message)
        clearInput();
    }

    const clearInput = () => {
        messageRef.current.value = '';
    }
    return (
        <div>
            <h1>chat</h1>
            <input type='text' placeholder='Mensagem' />
            <button onClick={() => handleSubmit()}>Send</button>
        </div>
    )
}

export default Chat;