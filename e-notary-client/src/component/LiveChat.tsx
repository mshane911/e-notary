import axios from 'axios';
import { randomUUID } from 'crypto';
import { FormEvent, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client"
import { ClientChatData } from '../common/types/ClientChatData';
import { ClientToServerEvents } from '../common/types/ClientToServerEvents';
import { ServerChatData } from '../common/types/ServerChatData';
import { ServerToClientEvents } from '../common/types/ServerToClientEvents';

interface User {
    _id: string | number;
    email: string;
    name: string;
    userType: string;
    password: string;
    country?: string;
    gender?: string;
    phoneNumber?: string | number;
}

// Get User details
axios.get('/api/getUser')
    .then((response) => {
        const user: User = response.data;
        localStorage.setItem("userName", user.name);
        localStorage.setItem("chatRoomId", user._id + "");
    })

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:9000").connect()

export function LiveChat() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(() => {
        return JSON.parse(localStorage.getItem("chatMessages")) || []
    });

    const username = localStorage.getItem("userName");
    const roomname = localStorage.getItem("chatRoomId");
    socket.on('connect', () => {
        socket.emit('joined-user', {
            username: username,
            roomname: roomname
        })
    });

    useEffect(() => {
        socket.on('chat', (data: ServerChatData) => {
            setMessages([...messages, data]);
            localStorage.setItem("chatMessages", JSON.stringify(messages));
        });
    }, [socket, messages]);

    useEffect(() => {
    }, [socket])

    function handleSendMessage(e: FormEvent<HTMLFormElement>) {
        const username = localStorage.getItem("userName");
        const roomname = localStorage.getItem("chatRoomId");
        e.preventDefault();
        if (message.trim() && localStorage.getItem('userName')) {
            socket.emit('chat', {
                username: username,
                message: message,
                roomname: roomname
            })
        }
        setMessage('');
    }

    function handleUploadFile(e: FormEvent<HTMLFormElement>) {
        const username = localStorage.getItem("userName");
        const roomname = localStorage.getItem("chatRoomId");
        e.preventDefault();
        if (file) {
            socket.emit("upload", {
                file: file,
                username: username,
                roomname: roomname
            });
        }
    }

    return (
        <div>
            <h1 className="room-message"></h1>
            <div className="window">
                <div className="chat-message">
                    <div id="output">
                        {messages.map((message: { username: string, message: string }) =>
                            message.username === localStorage.getItem('userName') ? (
                                <div className="message__chats" key={message.username + message.message + randomUUID}>
                                    <p className="sender__name"><b>You:</b>{message.message}</p>
                                </div>
                            ) : (
                                <div className="message__chats" key={message.username + message.message + randomUUID}>
                                    <p><b>{message.username}:</b> {message.message}</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <form className="messageField" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        placeholder="Write message"
                        className="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="sendBtn">SEND</button>
                </form>
                <form className="upload-field" onSubmit={handleUploadFile}>
                    <label>
                        <input type="file" id="file" className='file-upload' onChange={(e) => setFile(e.target.files[0])} />
                        <i>Attach File</i>
                    </label>
                    <button id="upload">Upload</button>
                </form>
            </div >
            <div className="online">
                <p className="users-online">Users Online</p>
                <div className="users">
                </div>
            </div>
        </div >
    )
}