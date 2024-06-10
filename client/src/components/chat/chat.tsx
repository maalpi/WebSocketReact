import React,{useRef, useState, useEffect} from 'react';

interface ChatProps {
    socket: any; // Altere 'any' para o tipo correto do seu socket, se disponível
}

interface Message {
    author: string;
    text: string;
}

const Chat: React.FC<ChatProps> = ({socket}) => {
    const messageRef = useRef();
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
            setMessageList((current) => [...current, data])
        })

        return () => socket.off('receive_message');
    }, [socket])

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
            {
                messageList.map((message, index) => (
                    <p>{message.author}: {message.text}</p>
                ))
            }
            <input type='text' placeholder='Mensagem' />
            <button onClick={() => handleSubmit()}>Send</button>
        </div>
    )
}

export default Chat;
