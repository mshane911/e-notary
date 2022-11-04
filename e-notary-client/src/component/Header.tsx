import React from 'react'
import '../styles/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

export default function Header(){
    return (
        <header>
            <div className = "logoContainer">
                <img src = {require('../media/logo.png')} className="bgLogo"></img>
                <h2 className='logoText'>E-Notary</h2>
            </div>
            <nav className='navLinks'>
                <ul>
                    <li><a href = "#verifyDocument">Verify Document</a></li>
                    <li><a href = "#uploadDocument">Upload Document</a></li>
                    <li><a href = "#askUs">Ask Us</a></li>
                </ul>
            </nav>
            <ul className='buttonLinks'>
                <li><a className='logOut' href = "#logout"><button>Log Out</button></a></li>
                <li><FontAwesomeIcon icon={faCircleUser} className='profileIcon'/></li>
            </ul>
        </header>
    )
}