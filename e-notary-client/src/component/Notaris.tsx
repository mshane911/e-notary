import React, { useEffect, useState } from 'react'
import '../styles/notaris.css'

import { io, Socket } from "socket.io-client";
import { ClientToServerEvents } from '../common/types/ClientToServerEvents';
import { ServerChatData } from '../common/types/ServerChatData';
import { ServerToClientEvents } from '../common/types/ServerToClientEvents';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:9000").connect();

export default function Notaris() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(() => {
        return JSON.parse(localStorage.getItem("chatMessages")) || []
    });

    const [rooms, setRooms] = useState([]);

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
        socket.on('active-rooms', (rooms) => {
            setRooms(rooms);
        })
    }, [socket])


    return (
        <div className="body">
            <div className="container">
                <div className="leftSide">
                    <div className='topLeftContainer'>
                        <p className='chats'>CHATS</p>
                        <div className='chats-container'>
                            {rooms.map((room: string) =>
                                <div className="chat-selector" key={"selector" + room}>
                                    <p className="chat-selector-name" key={"selectorName" + room}>{room}</p>
                                </div>
                            )}
                        </div>
                        <hr className='hr1'></hr>
                    </div>
                    <div className='bottomLeftContainer'></div>
                </div>

                <div className="rightSide">

                </div>
            </div>
        </div>
    )
}