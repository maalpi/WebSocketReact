import React, { useRef, useState, useEffect } from 'react';

interface Message {
    author: string;
    text: string;
}

interface ChatProps {
    socket: SocketIOClient.Socket; // Tipo específico do seu socket, substitua conforme necessário
}

const Chat: React.FC<ChatProps> = ({ socket }) => {
    const messageRef = useRef<HTMLInputElement>(null);
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

    const handleSubmit = () => {
        if (messageRef.current) {
            const message = messageRef.current.value;
            if (!message.trim()) return;

            socket.emit('message', message);
            clearInput();
        }
    };

    const clearInput = () => {
        if (messageRef.current) {
            messageRef.current.value = '';
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            {messageList.map((message, index) => (
                <p key={index}>{message.author}: {message.text}</p>
            ))}
            <input type="text" ref={messageRef} placeholder="Mensagem" />
            <button onClick={handleSubmit} style={{backgroundColor: 'E91E63'}}>Send</button>
        </div>
    );
};

export default Chat;
