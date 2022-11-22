import axios from 'axios';
import React from 'react';
import { FormEvent, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client"
import { ClientChatData } from '../common/types/ClientChatData';
import { ClientToServerEvents } from '../common/types/ClientToServerEvents';
import { ServerChatData } from '../common/types/ServerChatData';
import { ServerToClientEvents } from '../common/types/ServerToClientEvents';

import '../styles/livechat.css'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { stringify } from 'querystring';

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
    const [curTime, setCurTime] = useState("")

    const username = localStorage.getItem("userName");
    const roomname = localStorage.getItem("chatRoomId");
    socket.on('connect', () => {
        socket.emit('joined-user', {
            username: username,
            roomname: roomname
        });

        var config = {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
        axios.post("/api/langcode/createBot", { "botName": username }, config)
            .then((apiRes) => {
                localStorage.setItem("chatBotId", apiRes.data.id);
            })
            .catch((err) => {
                console.log(err.message);
            });
    });

    useEffect(() => {
        document.title = "Chat with E-Notary"
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

        var config = {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }

        var data = {
            "botId": localStorage.getItem("chatBotId"),
            "userId": localStorage.getItem("chatRoomId"),
            "text": message
        }

        var getMessagesData = {
            "botId": localStorage.getItem("chatBotId"),
            "userId": localStorage.getItem("chatRoomId"),
            "count": 1
        }

        axios.post("/api/langcode/sendMessageToBot", data, config)
            .then((apiRes) => {
                setTimeout(() => {
                    axios.post("/api/langcode/getMessagesInSession", getMessagesData, config)
                        .then((apiRes) => {
                            console.log(messages[messages.length])
                            setMessages([...messages, { username: "Langcode Bot", message: apiRes.data[0].text }])
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                }, 1000);
            })
            .catch((err) => {
                console.log(err.message);
            });


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

    function displayFileName(e: File) {
        setFile(e)
        var value = (document.getElementById("user-file-upload") as HTMLInputElement).value
        console.log("file not empty:", value !== "")

        value = value.replace(/.*[\/\\]/, '')
        value !== "" ? document.getElementById("btn-label").innerHTML = value : document.getElementById("btn-label").innerHTML = "Click here to select a file"
    }
    return (
        <div>
            <Header />
            <h3 className="room-message">
                You're now connected to our notary!
                <FontAwesomeIcon icon={faCircle} className="onlineCircle" />
            </h3>
            <div className="window">
                <div className="chat-message">
                    <div id="output">
                        {messages.map((message: { username: string, message: string }) =>
                            message.username === localStorage.getItem('userName') ? (
                                <div>
                                    <div className="message__chats" key={message.username + message.message + Math.floor(Math.random() * 1000)}>
                                        <p className="sender__name">{message.message}</p>
                                    </div>
                                    <div>
                                        <p><b>You  </b></p>
                                    </div>
                                </div>
                            ) : (
                                <div className="message__chats" key={message.username + message.message + Math.floor(Math.random() * 1000)}>
                                    <p><b>{message.username}:</b> {message.message}</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className='form-container'>
                <form className="upload-field" onSubmit={handleUploadFile}>
                    <div className='input-doc'>
                        <div className='filename-display'>
                            <label htmlFor='user-file-upload'>
                                <p className="mobileHidden input-btn-label" id="btn-label">Click here to select a file</p>
                            </label>
                            <input type="file" id="user-file-upload" accept="application/pdf" onChange={(e) => { displayFileName(e.target.files[0]) }} />
                        </div>
                        {/* <div className='file-label'> */}
                        <button className="mobileHidden send-file-btn">Upload
                        </button>
                        {/* </div> */}
                    </div>

                </form>
                <form className="messageField" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        placeholder="Write message"
                        className="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="sendBtn"><FontAwesomeIcon icon={faPaperPlane} /></button>
                </form>
            </div>
        </div >
    )
}