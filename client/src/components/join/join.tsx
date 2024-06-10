import React, { useRef } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

interface JoinProps {
    setChatVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    setSocket: React.Dispatch<React.SetStateAction<any>>;
}

const Join: React.FC<JoinProps> = ({ setChatVisibility, setSocket }) => {
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
        <Login>
            <h1>Login</h1>
                <input type='text' ref={usernameRef} name="text" autoComplete="off" placeholder='username' className='input'/>
            <button onClick={handleSubmit} className='button-1'>Join</button>
        </Login>
    )
}

const Login = styled.div`
    h1 {
        font-family: monospace;
    }

    .button-1 {
        background-color: #fa4753;
        border-radius: 8px;
        border-style: none;
        box-sizing: border-box;
        color: #FFFFFF;
        cursor: pointer;
        display: inline-block;
        font-family: monospace;
        font-size: 14px;
        font-weight: 500;
        height: 40px;
        line-height: 20px;
        list-style: none;
        margin: 0;
        margin-left: 0.2rem;
        outline: none;
        padding: 10px 16px;
        position: relative;
        text-align: center;
        text-decoration: none;
        transition: color 100ms;
        vertical-align: baseline;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        }

    .button-1:hover,
    .button-1:focus {
        background-color: #F082AC;
    }

    .input {
        max-width: 190px;
        height: 30px;
        border: 2px solid transparent;
        outline: none;
        border-bottom: 2px solid #3f3f3f;
        caret-color: #3f3f3f;
        background-color: #242424;
        padding: 5px;
        transition: .5s linear;
        font-family: monospace;
        letter-spacing: 1px;
    }

    .input:focus {
        border: 2px solid #fa4753;
        caret-color: #fa4753;
        color: #fa4753;
        box-shadow: 4px 4px 10px #070707;
    }

    .input:focus::placeholder {
        color: #fa4753;
    }
`;

export default Join;

