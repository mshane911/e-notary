import React, { useState, useEffect } from 'react'
import '../styles/home.css'
import Header from './Header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faTrash, faCircleCheck, faCircleXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons'
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

            storePdf();
            
        }
    }, [userFile])
    
    const removeUploadedFile = () => {
        setUserFile("")
        console.log("userFile is null")
        document.getElementById("fileNameField").innerHTML = "No file chosen"
        const removeFile = document.getElementById("cancelInput")
        removeFile.style.visibility = "hidden"
    }

    async function storePdf () {
        // save document to database
        console.log("---saving doc to db---")
        const formData = new FormData();
        formData.append('document', userFile[0])
        console.log(userFile[0])

        const config = {
            method: "POST",
            url: "/api/usign/storePdf/",
            data: formData,
        }

        const response = await axios(config)
        console.log(response.data)
        
        // axios(config).then(
        //     (res) => {
        //         console.log(res)
        //         console.log(res.data)
        //     }).catch((err) => {
        //         console.log(err)
        //     }
        // )
        console.log("---end of saving doc to db---")
    }

    function goToSignature(){
        navigate('/signaturepage')
    }

    var isOpen = false;
    function showAndCloseInstruction(){
        var value = document.getElementById("section");
        if (isOpen == false){
            value.style.display = 'block';
            isOpen = true;
        }
        else if (isOpen == true){
            value.style.display = 'none';
            isOpen = false;
        }
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
                        <div className='addSignBtn'>
                            <input type="submit" id='signatureBtn' value="Add Your Signature" onClick={goToSignature}></input>
                        </div>
                    </div>
                </form>
                <div className='instructionContainer'>
                    <div className='instruction'>
                        <div className='viewInstruction'>
                            <button onClick={showAndCloseInstruction} className="caretDownbtn">
                                How to view my verified signed document?
                                <FontAwesomeIcon icon={faCaretDown} className="caretDown"/>
                            </button>
                        </div>
                        <div className='instructionWrapper'>
                            <div className='instructionList' id="section">
                                <div>1. Open the verified document with Adobe Acrobat Reader</div>
                                <div>2. Click the signature icon which located at the left side along with the page thumbnail and attachment icon</div>
                                <div className="photo1">
                                    <img src = {require('../media/Screenshot1.jpg')}></img>
                                </div>
                                <div>
                                    <br/>3. Now you can see your signature validation status</div>
                                <div className="photo2">
                                    <br/><img src = {require('../media/Screenshot2.jpg')}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
