import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"
import { faUser, faEnvelope, faLock, faX } from '@fortawesome/free-solid-svg-icons'
import '../styles/landing.css'

export default function Landing() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [userType, setUserType] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [userEmail, setUserEmail] = useState("")
    const [userPass, setUserPass] = useState("")

    // Modal Functions
    const openSignUpForm = () => {
        document.getElementById("signIn").style.display = "none"
        document.getElementById("signUp").style.display = "flex"
    }

    const closeSignUpForm = () => {
        document.getElementById("signUp").style.display = "none"
    }

    const openSignInForm = () => {
        document.getElementById("signUp").style.display = "none"
        document.getElementById("signIn").style.display = "flex"
    }

    const closeSignInForm = () => {
        document.getElementById("signIn").style.display = "none"
    }

    // POST for Sign Up
    function checkValiditySignUp() {
        name === "" ? document.getElementById('nameError').style.visibility = "visible" : document.getElementById('nameError').style.visibility = "hidden"
        email === "" ? document.getElementById('emailError').style.visibility = "visible" : document.getElementById('emailError').style.visibility = "hidden"
        password.length < 8 ? document.getElementById('passError').style.visibility = "visible" : document.getElementById('passError').style.visibility = "hidden"
        passwordConfirm === "" || password !== passwordConfirm ? document.getElementById('passError2').style.visibility = "visible" : document.getElementById('passError2').style.visibility = "hidden"
        userType === "" ? document.getElementById('typeError').style.visibility = "visible" : document.getElementById('typeError').style.visibility = "hidden"

        if (name === "" || email === "" || password.length < 8 || passwordConfirm === "" || passwordConfirm !== password || userType === "") {
            return false
        }
        return true
    }

    const submitSignUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        const isValid = checkValiditySignUp();

        if (!isValid) {
            e.preventDefault();
        }

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

    //POST for Sign In
    function checkValiditySignIn() {
        userEmail === "" ? document.getElementById('signInEmail').style.visibility = "visible" : document.getElementById('signInEmail').style.visibility = "hidden"
        userPass === "" ? document.getElementById('signInPassword').style.visibility = "visible" : document.getElementById('signInPassword').style.visibility = "hidden"

        return true
    }

    const submitSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const config = {
            method: "POST",
            url: "/api/login/",
            data: {
                userEmail,
                userPass
            }
        }

        axios(config)
            .then(
                (res) => {
                    alert(res.data.message)
                    navigate('/home', { replace: true })

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

    useEffect(() => {
        document.title = "E-Notary"
    })

    return (
        <div className='landingSection'>
            <img src={require('../media/landing-img.jpg')} className='bgImg' />
            <div className='overlay'></div>

            <div className='visibleContainer'>
                <div className='visibleContainerContent'>
                    <img src={require('../media/logo.png')} className='logo' />
                    <h1 className='sectionTitle'>Meet <span className='appleFont'>E-notary</span></h1>
                    <p className='sectionSubtitle'>Making digital signatures secure and easy</p>
                    <button className='signUpBtn' onClick={openSignUpForm}>SIGN UP NOW</button>
                    <p className='signInText'>Have an account? <span className='underlineText' onClick={openSignInForm}>Sign In</span></p>
                </div>
            </div>

            <div className='toggleContainer'>
                <div className='formContainer' id='signUp'>
                    <form>
                        <FontAwesomeIcon icon={faX} className="closeBtn" onClick={closeSignUpForm} />
                        <h2 className='formTitle'>Create An Account</h2>
                        <p className='formSubtitle'>Welcome to E-Notary, <br className='hiddenDesktop'></br>Please fill in your details below</p>
                        <div className='formContent'>
                            <div className='inputContainer'>
                                <FontAwesomeIcon icon={faUser} className="formIcon" />
                                <input type="text" id="name" className="textInput" placeholder="Full Name" name="name" onChange={(e) => setName(e.target.value)} required></input>
                            </div>
                            <small id="nameError">Please enter your name!</small>

                            <div className='inputContainer'>
                                <FontAwesomeIcon icon={faEnvelope} className="formIcon" />
                                <input type="text" id="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" className="textInput" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
                            </div>
                            <small id="emailError">Please enter a valid email!</small>

                            <div className='inputContainer'>
                                <FontAwesomeIcon icon={faLock} className="formIcon" />
                                <input type="password" id="pass" autoComplete='on' className="textInput" placeholder="Password" name="pass" onChange={(e) => setPassword(e.target.value)} required></input>
                            </div>
                            <small id="passError">Please enter a password (min. 8 characters) </small>

                            <div className='inputContainer'>
                                <FontAwesomeIcon icon={faLock} className="formIcon" />
                                <input type="password" id="passConfirm" autoComplete='on' className="textInput" placeholder="Confirm Your Password" name="passconfirm" onChange={(e) => { setPasswordConfirm(e.target.value) }} required></input>
                            </div>
                            <small id="passError2">Please input the same password!</small>

                            <div className="inputWrapper">
                                <select className='selectWrapper' id="type" onChange={(e) => setUserType(e.target.value)}>
                                    <option selected disabled>Select Account Type</option>
                                    <option value="employee">Employee</option>
                                    <option value="company">Company</option>
                                    <option value="notary">Notary</option>
                                </select>
                            </div>
                            <small id="typeError">Please select your account type!</small>
                        </div>
                        <div className='tncLabel'>
                            <input type="checkbox" name="tnc" value="tnc" required />
                            <label>I have read and agree to the <br></br><span className='tnc'>Terms & Conditions</span></label>
                        </div>

                        <div className='submitWrapper'>
                            <input type="submit" value="Create Account" className='signUpSubmit' onClick={submitSignUp}></input>
                        </div>

                    </form>
                </div>

                <div className='formContainer' id='signIn'>
                    <form>
                        <FontAwesomeIcon icon={faX} className="closeBtn" onClick={closeSignInForm} />
                        <h2 className='formTitle'>Welcome Back</h2>
                        <p className='formSubtitle'>Please Fill in Your Details </p>
                        <div className='formContent'>
                            <div className='inputContainer'>
                                <FontAwesomeIcon icon={faEnvelope} className="formIcon" />
                                <input type="text" className="textInput" placeholder="Email" name="email" onChange={(e) => setUserEmail(e.target.value)} required></input>
                            </div>
                            <small id="signInEmail">Please enter a valid email!</small>

                            <div className='inputContainer'>
                                <FontAwesomeIcon icon={faLock} className="formIcon" />
                                <input type="password" autoComplete='on' className="textInput" placeholder="Password" name="pass" onChange={(e) => setUserPass(e.target.value)} required></input>
                            </div>
                            <small id="signInPassword">Please enter a valid password!</small>

                        </div>

                        <div className='submitWrapper'>
                            <input type="submit" value="Sign In" className='signInSubmit' onClick={submitSignIn}></input>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}