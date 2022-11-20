import React, { useEffect } from 'react'
import '../styles/signaturepage.css'
import Header from './Header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


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

    function fetchCountryList(){
        document.addEventListener('DOMContentLoaded', () => {

            const selectDrop = document.getElementById('countries');
          
            fetch('https://restcountries.com/v3.1/all')
            .then(res => {
                return res.json();
            })
            .then((data) => {
                let options = "";
                data.sort((a: { name: { common: string } }, b: { name: { common: string } }) => ('' + a.name.common).localeCompare(b.name.common))
                data.forEach((country: { name: any }) => {
                    options += `
                    <option value="${country.name.common}">${country.name.common}</option>`;
                })
                selectDrop.innerHTML = options;
            })
            .catch(err => {
                console.log(err);
            })
        });
    }

    function fetchFile(){
        const config = {
            method: "GET",
            url: "/api/usign/uploadFile/",
        }
        // console.log(files)
        
        // axios(config).then(
        //     (res) => {
        //         console.log(res)
        // }).catch(
        //     (err) => {
        //         console.log(err)

        //     }
        // )
    }

    return(
        <div>
            <>
                {fetchFile()}
                {fetchCountryList()}
            </>
            <Header />
            <div className='dashboard'>
                <h1 className='sectionTitle'>Creating A Digital Signature Has Never Been Easier!</h1>
                <h3 className='sectionSubtitle'>Upload a document you want to sign and fill in the necessary information below</h3>

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
                    <div className='row'>
                        <div className='col-6 col-sm-12'>
                            First name<br/>
                            <input type = "text" id = "firstname" required/><hr className='spacing'/>
                        </div>
                        <div className='col-6 col-sm-12'>
                            Last name<br/>
                            <input type = "text" id = "lastname" required/><hr className='spacing'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 col-sm-12'>
                            Date<br/>
                            <input type = "date" id = "date" required/><hr className='spacing'/>
                        </div>
                        <div className='col-6 col-sm-12'>
                            Time<br/>
                            <input type = "time" id = "time" required/><hr className='spacing'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 col-sm-12'>
                            Location<br/>
                            {/* <input type = "text" id = "location" required/><hr className='spacing'/> */}
                            <select id="countries" name="countries"></select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <button type='submit' className='generatesignaturebutton'>Generate Digital Signature</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}