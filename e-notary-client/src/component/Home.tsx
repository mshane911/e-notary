import React, { useState, useEffect } from 'react'
import '../styles/home.css'
import Header from './Header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faTrash, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

export default function Home(){
    const navigate = useNavigate()
    const [userFile, setUserFile] = useState(null)

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
    const [user, setUser] = useState(null);

    useEffect(() => {
        document.title = "Welcome to your dashboard"
        axios.get('/api/getUser')
        .then((response) => {
            const user: User = response.data;
            setUser(user);
            console.log(user);
        })
    }, []);

    useEffect(() => {
        console.log(userFile)
        if (userFile != null) {
            if (userFile == "") {
                removeUploadedFile()
                return
            }
            console.log("userFile is not null")
            console.log(userFile[0])
            console.log(userFile[0].name)

            const removeFile = document.getElementById("cancelInput")

            document.getElementById("fileNameField").innerHTML = userFile[0].name

            removeFile.style.visibility = "visible"
        }
    }, [userFile])
    
    const removeUploadedFile = () => {
        setUserFile("")
        console.log("userFile is null")
        document.getElementById("fileNameField").innerHTML = "No file chosen"
        const removeFile = document.getElementById("cancelInput")
        removeFile.style.visibility = "hidden"
    }

    function uploadToSignature(files: FileList){
        // get file
        const uploadedUserFile = files[0]
        setUserFile(uploadedUserFile) // bisa diapus

        const formData = new FormData();
        formData.append('document', uploadedUserFile)

        const config = {
            method: "POST",
            url: "/api/usign/storePdf/",
            data: formData,
        }
        console.log(files)
        
        axios(config).then(
            (res) => {
                console.log(res)
                console.log(res.data)
                console.log(res.data.url)

            }).catch((err) => {
                console.log(err)
            }
        )
        navigate('/signaturepage')
    }


    //TODO: add more input checks for pdf
    //TODO: Display verify label based on usign
    //TODO: pass file to signature page

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
                
                <form encType="multipart/form-data" action='/api/usign/storePdf' method='post' >
                    <div className='fileInputWrapper'>
                        <div className='leftWrapper'>
                            <p className='fileName' id="fileNameField">No file chosen</p>
                        </div>

                        <div className='rightWrapper'>
                            <label htmlFor="fileInput" className='labelInputWrapper'>
                                <p className="mobileHidden inputBtnLabel">Upload File</p>
                                <FontAwesomeIcon icon={faUpload} className="inputBtn" />
                            </label>
                            <input type="file" id="fileInput" accept="application/pdf" onChange={(e) => {setUserFile(e.target.files)}}/>
                        </div>
                    </div>
                    <div  id="cancelInput" onClick={removeUploadedFile}>
                        <p className='removeFileLabel'>Remove File</p>
                        <FontAwesomeIcon icon={faTrash}/>
                    </div>

                    <div className='submitWrapper'>
                        {/* <div className='verifyDocBtn'>
                            <input type="submit" value="Verify This Document" disabled id='verifyBtn'/>
                        </div> */}
                        <div className='addSignBtn'>
                            <input type="submit" id='signatureBtn' value="Add Your Signature" onClick={() => uploadToSignature(userFile)}></input>
                        </div>
                    </div>
                </form>

                {/* <div className='verificationInfo'>
                    <div className='verifyStatusGood'>
                        <h3>Document Verified <FontAwesomeIcon icon={faCircleCheck} /></h3>
                    </div>
                    <div className='verifyStatusBad'>
                        <h3>Document Not Verified <FontAwesomeIcon icon={faCircleXmark} /></h3>
                    </div>
                </div> */}
            </div>
        </div>
        )
        }
    }

    return(
        <div>
            <Dashboard />
        </div>
    )
}