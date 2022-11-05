import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"
import { faUser, faEnvelope, faLock, faX } from '@fortawesome/free-solid-svg-icons'
import '../styles/landing.css'

export default function Landing() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [userType, setUserType] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

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

    function checkPassword(){
        return password == passwordConfirm ? true : false
    }

    // TODO: add check password the same or not
    const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        const isPasswordSame = checkPassword();
        if (!isPasswordSame) {
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
                        <p className='formSubtitle'>Welcome to E-Notary, Please fill in your details below</p>
                        <div className='formContent'>
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
                                <input type="password"  autoComplete='on' className="textInput" placeholder="Password" name="pass" onChange={(e) => setPassword(e.target.value)} required></input>
                            </div>
                            <div className='inputContainer'>
                                <FontAwesomeIcon icon={faLock} />
                                <input type="password" autoComplete='on' className="textInput" placeholder="Confirm Your Password" name="passconfirm" onChange={(e) => { setPasswordConfirm(e.target.value)}} required></input>
                            </div>
                            <div className="inputWrapper">
                                <select className='selectWrapper' onChange={(e) => setUserType(e.target.value)}>
                                    <option defaultValue="" disabled >Select Account Type</option>
                                    <option value="employee">Employee</option>
                                    <option value="company">Company</option>
                                </select>
                            </div>
                        </div>
                        <div className='tncLabel'>
                            <input type="checkbox" name="tnc" value="tnc" required />
                            <label>I have read and agree to the <br></br><span className='tnc'>Terms & Conditions</span></label>
                        </div>

                        <div className='submitWrapper'>
                            <input type="submit" value="Create Account" className='signUpSubmit' onClick={submitForm}></input>
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
                            <FontAwesomeIcon icon={faEnvelope} />
                                <input type="text" className="textInput" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
                            </div>
                            <div className='inputContainer'>
                                <FontAwesomeIcon icon={faLock} />
                                <input type="password" autoComplete='on' className="textInput" placeholder="Password" name="pass" onChange={(e) => setPassword(e.target.value)} required></input>
                            </div>
                        </div>

                        <div className='submitWrapper'>
                            <input type="submit" value="Sign In" className='signInSubmit'></input>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}