import React from 'react'
import '../styles/namecard.css'

export default function Namecard1(){
    return(
        <div className="namecardContainer">
            <div className="CONTAINER">
                <div className="leftContainer">
                    <div className='containerTop'></div>
                    <div className='containerForChats'>
                        <table className='listOfName'>
                            <tr>
                                <td className='name1'>
                                   <button name = "name1" className='name1btn active'>John Doe<p className='userType'>Employee User</p></button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div className="rightContainer">
                    <div className='nameContainer'>
                        <h4 className='pplName'>John Doe</h4>
                        <hr className='hr2'/>
                    </div>
                    <div className='messagesContainer'>
                        <table className='messages'>
                            <tr>
                                <td className='tdMsg1'><p className='msg1'>Hello</p></td>
                                <td className='tdSpace'></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className='tdSpace'></td>
                                <td className='tdMsg2'><p className='msg2'>Hello, may I help you</p></td>
                            </tr>
                        </table>
                    </div>
                    <div className='chatboxContainer'>
                        <textarea placeholder = "Type a message" rows={1} className='chatbox'></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}