import React,{useRef} from 'react';
import io from 'socket.io-client';

interface JoinProps {
    setChatVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    setSocket: React.Dispatch<React.SetStateAction<any>>;
}

const Join: React.FC<JoinProps>= ({ setChatVisibility, setSocket }) => {
    const usernameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const username: string = usernameRef.current.value;
        if(!username.trim()) return;
        const socket = io.connect('http://localhost:3001');
        socket.emit('set_username', username);
        console.log(socket)
        setSocket(socket);
        setChatVisibility(true);
    }
    return (
        <div>
            <h1>Join</h1>
            <input type='text' ref={usernameRef} placeholder='User' />
            <button onClick={ ()=> handleSubmit()}>Join</button>
        </div>
    )
}

export default Join;