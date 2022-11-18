import React, { useState, useEffect } from 'react'
import '../styles/home.css'
import Header from './Header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faTrash, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

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

export default function Home(){
    const [user, setUser] = useState(null);
    // const [isBusy, setBusy] = useState(true);

    

    useEffect(() => {
        document.title = "Welcome to your dashboard"
        axios.get('/api/getUser')
        .then((response) => {
            const user: User = response.data;
            setUser(user);
            console.log(user);
        })
    }, []);
    
    // TODO: Get user name
    const displayFileName = () => {
        var value = (document.getElementById("fileInput") as HTMLInputElement).value
        const removeFile = document.getElementById("cancelInput")
        const verifyFile = document.getElementById("verifyBtn") as HTMLButtonElement | null;

        console.log(value !== "")

        value = value.replace(/.*[\/\\]/, '')
        document.getElementById("fileNameField").innerHTML = value

        value !== "" ? removeFile.style.visibility = "visible" : removeFile.style.visibility = "hidden"
        value !== "" ? verifyFile.disabled = false : verifyFile.disabled = true
    }

    const removeUploadedFile = () => {
        var input = (document.getElementById("fileInput") as HTMLInputElement).value
        const removeFile = document.getElementById("cancelInput")
        const verifyFile = document.getElementById("verifyBtn") as HTMLButtonElement | null;

        input = ""
        document.getElementById("fileNameField").innerHTML = "No file chosen"

        console.log((document.getElementById("fileNameField") as HTMLInputElement).value)

        input !== "" ? removeFile.style.visibility = "visible" : removeFile.style.visibility = "hidden"
        input !== "" ? verifyFile.disabled = false : verifyFile.disabled = true
    }


    function Dashboard() {
        if (!user) {
            return <h1>Loading...</h1>
        } else {
            return (
            <div>
            <Header />            

            <div className='dashboard'>
                <div className='welcomeText'>
                    <span className ="nameText">Meet your 
                        <br className='mobileShow' /><b className='cursiveText'> E-Notary</b>, 
                        <br className='mobileShow' /> <span className='smallText'> {user.name} </span>
                    </span>
                    <br/>
                    <div className='belowName'>
                        <span className="helpText">What can I help you with today?</span>&emsp;
                        <span className="needsignature"><br className='mobileShow'/>I need a signature</span>
                    </div>
                </div>
                
                <form>
                    <div className='fileInputWrapper'>
                        <div className='leftWrapper'>
                            <p className='fileName' id="fileNameField">No file chosen</p>
                        </div>

                        <div className='rightWrapper'>
                            <label htmlFor="fileInput" className='labelInputWrapper'>
                                <p className="mobileHidden inputBtnLabel">Upload File</p>
                                <FontAwesomeIcon icon={faUpload} className="inputBtn" />
                            </label>
                            <input type="file" id="fileInput" accept="application/pdf" onChange={displayFileName} />
                        </div>
                    </div>
                    <div  id="cancelInput" onClick={removeUploadedFile}>
                        <p className='removeFileLabel'>Remove File</p>
                        <FontAwesomeIcon icon={faTrash}/>
                    </div>

                    <div className='submitWrapper'>
                        <div className='verifyDocBtn'>
                            <input type="submit" value="Verify This Document" disabled id='verifyBtn'/>
                        </div>
                        <div className='addSignBtn'>
                            <input type="submit" value="Add Your Signature" id="signatureBtn"/>
                        </div>
                    </div>
                </form>

                <div className='verificationInfo'>
                    <div className='verifyStatusGood'>
                        <h3>Document Verified <FontAwesomeIcon icon={faCircleCheck} /></h3>
                    </div>
                    <div className='verifyStatusBad'>
                        <h3>Document Not Verified <FontAwesomeIcon icon={faCircleXmark} /></h3>
                    </div>
                </div>
            </div>
        </div>
        )
        }
    }

    //TODO: add more input checks for pdf
    //TODO: Display verify label based on usign
    //TODO: pass file to signature page
    return(
        <div>
            <Dashboard />
        </div>
    )
}