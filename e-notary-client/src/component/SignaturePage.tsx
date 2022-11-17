import React, { useEffect } from 'react'
import '../styles/signaturepage.css'
import Header from './Header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons'


export default function SignaturePage(){
    useEffect(() => {
        document.title = "Enter your signature"
    })

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
    return(
        <div>
            <Header />
            <div className='dashboard'>
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
                </form>
            </div>

            <div className='fileinfo'>
                <form>
                <table className="signtable">
                    <tr>
                        <td>
                            First name<br/>
                            <input type = "text" id = "firstname"/><hr className='spacing'/>
                        </td>
                        <td className="blankgap"></td>
                        <td>
                            Last name<br/>
                            <input type = "text" id = "lastname"/><hr className='spacing'/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br/>
                            Date<br/>
                            <input type = "text" id = "date"/><hr className='spacing'/>
                        </td>
                        <td className="blankgap"></td>
                        <td>
                            <br/>
                            Time<br/>
                            <input type = "text" id = "time"/><hr className='spacing'/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br/>
                            Location<br/>
                            <input type = "text" id = "location"/><hr className='spacing'/>
                        </td>
                        <td className="blankgap"></td>
                        <td></td>
                    </tr>
                </table>
                <br/>
                <button type='submit' className='generatesignaturebutton'>Generate Digital Signature</button>
                </form>
            </div>
        </div>
    )
}