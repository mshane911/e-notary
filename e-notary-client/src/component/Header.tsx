import React from 'react'
import { useNavigate } from "react-router-dom";

import '../styles/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function Header(){
    const navigate = useNavigate()

    const userLogOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const config = {
            method: "POST",
            url: "/api/logout/"
        }

        axios(config)
            .then(
                (res) => {
                    console.log(res.data.message)
                    navigate('/' , {replace: true}) // change localhost/email=?pass=? to the home page
                    
                }
            )
            .catch(
                (err) => {
                    alert(err)
                    console.log(err)
                }
            );

        return false
    }

    return (
        <header>
            <div className = "logoContainer">
                <img src= {require('../media/mobile_logo.png')} className="bgLogoMobile" />
                <img src = {require('../media/logo.png')} className="bgLogo"></img>
                <h2 className='logoText'>E-Notary</h2>
            </div>
            <nav className='navLinks'>
                <ul>
                    <li className="link"><a href = "#verifyDocument">Verify Document</a></li>
                    <li className="link"><a href = "#uploadDocument">Upload Document</a></li>
                    <li className="link"><a href = "#askUs">Ask Us</a></li>
                </ul>
            </nav>
            <div className='buttonLinks'>
                <button className="logOutBtn" onClick={userLogOut}>Log Out</button>
                <FontAwesomeIcon icon={faCircleUser} className='profileIcon'/>
            </div>

            <div className='navToggle'>
                <FontAwesomeIcon icon={faBars} className='hamburgerIcon'/>
            </div>
            <nav className='mobileLink'></nav>
        </header>
    )
}