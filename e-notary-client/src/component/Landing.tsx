import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"
import { faUser, faEnvelope, faLock, faX } from '@fortawesome/free-solid-svg-icons'
import '../styles/landing.css'

export default function Landing() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [userType, setUserType] = useState("employee"); // TODO: BALIKIN JADI EMPTY STRING KALO UDAH DI BIKIN FORM NYA
    const [password, setPassword] = useState("");

    const openSignUpForm = () => {
        document.getElementById("signUp").style.display = "inline-block"
    }

    const closeSignUpForm = () => {
        document.getElementById("signUp").style.display = "none"
    }

    const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const config = {
            method: "POST",
            url: "/api/register/",
            data: {
                name,
                email,
                userType,
                password
            }
        }
        axios(config)
            .then(
                (result) => {
                    console.log(result)
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            );
    }

    useEffect(() => {
        document.title = "E-Notary"
    })

    return (
        <div className='landingSection'>
            <img src={require('../media/landing-img.jpg')} className='bgImg' />
            <div className='overlay'></div>

            <div className='visibleContainer' style={{ margin: "100px" }}>
                <img src={require('../media/logo.png')} className='logo' />
                <h1 className='sectionTitle'>Meet <span className='appleFont'>E-notary</span></h1>
                <p className='sectionSubtitle'>Making digital signatures secure and easy</p>
                <button className='signUpBtn' onClick={openSignUpForm}>SIGN UP NOW</button>
                <p className='signIn'>Have an account? <span className='underlineText'>Sign In</span></p>
            </div>

            <div className='signUpForm toggleContainer' id='signUp'>
                <form>
                    <FontAwesomeIcon icon={faX} className="closeBtn" onClick={closeSignUpForm} />
                    <h2 className='formTitle'>Sign Up</h2>
                    <div className='inputContainer'>
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" className="textInput" placeholder="Full Name" name="name" onChange={(e) => setName(e.target.value)} required></input>
                    </div>
                    <div className='inputContainer'>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input type="text" className="textInput" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
                    </div>
                    <div className='inputContainer'>
                        <FontAwesomeIcon icon={faLock} />
                        <input type="text" className="textInput" placeholder="Password" name="pass" onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>

                    <div className='tncLabel'>
                        <input type="checkbox" name="tnc" value="tnc" required />
                        <label>I have read and agree to the <span className='tnc'>Terms & Conditions</span></label>
                    </div>

                    <div className='submitWrapper'>
                        <input type="submit" value="Create Account" className='signUpSubmit' onClick={submitForm}></input>
                    </div>
                </form>
            </div>

        </div>
    )
}