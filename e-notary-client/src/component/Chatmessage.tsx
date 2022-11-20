import React from 'react'
import '../styles/chatmessage.css'

export default function Chatmessage(){
    return(
        <div className='namecardContainer'>
            <div className='CONTAINER'>
                <div className="leftContainer"></div>
                <div className="rightContainer">
                    <div className='nameContainer'>
                        <h4 className='pplName'>John Doe</h4>
                        <hr className='hr2'/>
                    </div>
                    <div className='messagesContainer'>
                        <div className='gridItems1'>
                            <div className='clientChat1'>Hello</div>
                        </div>
                        <div className='gridItems2'>
                            <div className='notarisChat1'>Hello, may I help you</div>
                        </div>
                        <div className='gridItems1'>
                            <div className='clientChat2'>.....</div>
                        </div>
                        <div className='gridItems2'>
                            <div className='notarisChat2'>.....</div>
                        </div>
                        <div className='gridItems1'>
                            <div className='clientChat3'>.....</div>
                        </div>
                        <div className='gridItems2'>
                            <div className='notarisChat3'>.....</div>
                        </div>
                        <div className='gridItems1'>
                            <div className='clientChat4'>.....</div>
                        </div>
                        <div className='gridItems2'>
                            <div className='notarisChat4'>.....</div>
                        </div>
                        <div className='gridItems1'>
                            <div className='clientChat5'>.....</div>
                        </div>
                    </div>
                    
                    <div className='chatboxContainer'>
                        <div className='chatboxClass'>
                            <textarea placeholder = "Type a message" rows={1} className='chatbox'></textarea>
                        </div>
                        <div className='sendClass'>
                            <button name="send" className='sendbtn'>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}