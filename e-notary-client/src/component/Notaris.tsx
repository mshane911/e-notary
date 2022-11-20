import React from 'react'
import '../styles/notaris.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Notaris(){
    return(
        <div className="body">
            <div className="container">
                <div className="leftSide">
                    <div className='topLeftContainer'>
                        <div className='arrowSign'>
                            <a href = "/arrowBtn"><FontAwesomeIcon icon={faArrowLeft} className='arrowIcon'/></a>
                        </div>
                        <div className='chatsWord'>
                            <p className='chats'>CHATS</p>
                        </div>
                    </div>
                    <hr className='hr1'></hr>
                    <div className='bottomLeftContainer'></div>
                </div>

                <div className="rightSide"></div>
            </div>
        </div>
    )
}