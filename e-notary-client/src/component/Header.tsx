import React from 'react'
import { useNavigate } from "react-router-dom";

import '../styles/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function Header(){
    const navigate = useNavigate()
    var isMobileNavOpen = false

    function userLogOut(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        e.preventDefault();

        console.log("logging out!")
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

    function openNavBar(){
        if(isMobileNavOpen == false){
            document.getElementById("mobileLink").style.display = "block"
            isMobileNavOpen = true
        }
        else{
            document.getElementById("mobileLink").style.display = "none"
            isMobileNavOpen = false
        }

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
                    <li className="link"><a href = "/home">Verify Document</a></li>
                    <li className="link"><a href = "/signaturepage">Upload Document</a></li>
                    <li className="link"><a href = "/chat">Ask Us</a></li>
                </ul>
            </nav>
            <div className='buttonLinks'>
                <button className="logOutBtn" onClick={userLogOut}>Log Out</button>
                <a href="/profile"><FontAwesomeIcon icon={faCircleUser} className='profileIcon'/></a>
            </div>

            <div className='navToggle' onClick={openNavBar}>
                <FontAwesomeIcon icon={faBars} className='hamburgerIcon'/>
            </div>
            <nav className='mobileLink' id="mobileLink">
                <ul>
                    <li className="moblink"><a href = "/home">Verify Document</a></li>
                    <li className="moblink"><a href = "/signaturepage">Upload Document</a></li>
                    <li className="moblink"><a href = "/chat">Ask Us</a></li>
                    <li className='moblink'><a href = "/profile">Profile</a></li>
                    <li className="moblink"><a onClick={(e) => {userLogOut(e)}}>Log Out</a></li>
                </ul>   
            </nav>
        </header>
    )
}