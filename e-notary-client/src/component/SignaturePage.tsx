import React, { useState, useEffect } from 'react'
import '../styles/signaturepage.css'
import Header from './Header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


export default function SignaturePage(){
    var presetDict = {
        'customOption':{'stampX':'0', 'stampY':'0'},
        'topLeft':{'stampX':'70', 'stampY':'50'},
        'topMid':{'stampX':'275', 'stampY':'50'},
        'topRight':{'stampX':'475', 'stampY':'50'},
        'midLeft':{'stampX':'70', 'stampY':'374'},
        'midRight':{'stampX':'475', 'stampY':'374'},
        'bottomLeft':{'stampX':'70', 'stampY':'698'},
        'bottomMid':{'stampX':'275', 'stampY':'698'},
        'bottomRight':{'stampX':'475', 'stampY':'698'}
    }

    // to be changed later
    const apiKey = "194d030cdc15802d4068e7beffc9cf73e1c0fd653f8ce165fb9d55908681aa89"
    console.log("api key is " + apiKey)
    const [docName, setDocName] = useState(null)
    const [signName, setSignName] = useState(null)

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
        document.title = "Enter your signature"
        axios.get('/api/getUser')
        .then((response) => {
            const user: User = response.data;
            setUser(user);
            console.log(user);
        })
    }, []);

    const [userSign, setUserSign] = useState(null)
    useEffect(() => {
        console.log(userSign)
        console.log("triggered useEffect for userSign")
        if (userSign != null) {
            if (userSign == "") {
                removeUploadedSign()
                return
            }
            console.log("userSign is not null")
            console.log(userSign)

            const removeFile = document.getElementById("cancelSignInput")
            document.getElementById("signField").innerHTML = userSign.name
            removeFile.style.visibility = "visible"

            storeSignature();
        }
        if (userDoc != null) {
            if (userDoc == "") {
                removeUploadedDoc()
                return
            }
            console.log("userDoc is not null")
            console.log(userDoc)
            console.log(userDoc.name)

            const removeFile = document.getElementById("cancelDocInput")
            document.getElementById("docField").innerHTML = userDoc.name
            removeFile.style.visibility = "visible"

            storePdf();
        }
        console.log("userDoc here exists or nah:")
        console.log(userDoc)
    }, [userSign])

    const [userDoc, setUserDoc] = useState(null)
    useEffect(() => {
        console.log(userDoc)
        console.log("triggered useEffect for userDoc")
        if (userDoc != null) {
            if (userDoc == "") {
                removeUploadedDoc()
                return
            }
            console.log("userDoc is not null")
            console.log(userDoc)
            console.log(userDoc.name)

            const removeFile = document.getElementById("cancelDocInput")
            document.getElementById("docField").innerHTML = userDoc.name
            removeFile.style.visibility = "visible"

            storePdf();
        }
        if (userSign != null) {
            if (userSign == "") {
                removeUploadedSign()
                return
            }
            console.log("userSign is not null")
            console.log(userSign)

            const removeFile = document.getElementById("cancelSignInput")
            document.getElementById("signField").innerHTML = userSign.name
            removeFile.style.visibility = "visible"

            storeSignature();
        }
        console.log("userSign here exists or nah:")
        console.log(userSign)
    }, [userDoc])

    const removeUploadedDoc = () => {
        console.log("triggered remove uploaded doc")
        setUserDoc("")
        console.log("setUserDoc is null")
        document.getElementById("docField").innerHTML = "No file chosen"
        const removeFile = document.getElementById("cancelDocInput")
        removeFile.style.visibility = "hidden"
    }

    const removeUploadedSign = () => {
        console.log("triggered remove uploaded sign")
        setUserSign("")
        console.log("setUserSign is null")
        document.getElementById("signField").innerHTML = "No signature chosen"
        const removeFile = document.getElementById("cancelSignInput")
        removeFile.style.visibility = "hidden"
    }

    function takePresetCoordinates(){
        var presetLocate = (document.getElementById('presetLocate') as HTMLInputElement).value
        console.log(presetLocate)
        
        if (presetLocate == "topLeft"){
            var xField = (document.getElementById('xField') as HTMLInputElement).value = presetDict["topLeft"]["stampX"]
            var yField = (document.getElementById('yField') as HTMLInputElement).value = presetDict["topLeft"]["stampY"]
        }
        else if (presetLocate == "topMid"){
            var xField = (document.getElementById('xField') as HTMLInputElement).value = presetDict["topMid"]["stampX"]
            var yField = (document.getElementById('yField') as HTMLInputElement).value = presetDict["topMid"]["stampY"]
        }
        else if (presetLocate == "topRight"){
            var xField = (document.getElementById('xField') as HTMLInputElement).value = presetDict["topRight"]["stampX"]
            var yField = (document.getElementById('yField') as HTMLInputElement).value = presetDict["topRight"]["stampY"]
        }
        else if (presetLocate == "midLeft"){
            var xField = (document.getElementById('xField') as HTMLInputElement).value = presetDict["midLeft"]["stampX"]
            var yField = (document.getElementById('yField') as HTMLInputElement).value = presetDict["midLeft"]["stampY"]
        }
        else if (presetLocate == "midRight"){
            var xField = (document.getElementById('xField') as HTMLInputElement).value = presetDict["midRight"]["stampX"]
            var yField = (document.getElementById('yField') as HTMLInputElement).value = presetDict["midRight"]["stampY"]
        }
        else if (presetLocate == "bottomLeft"){
            var xField = (document.getElementById('xField') as HTMLInputElement).value = presetDict["bottomLeft"]["stampX"]
            var yField = (document.getElementById('yField') as HTMLInputElement).value = presetDict["bottomLeft"]["stampY"]
        }
        else if (presetLocate == "bottomMid"){
            var xField = (document.getElementById('xField') as HTMLInputElement).value = presetDict["bottomMid"]["stampX"]
            var yField = (document.getElementById('yField') as HTMLInputElement).value = presetDict["bottomMid"]["stampY"]
        }
        else if (presetLocate == "bottomRight"){
            var xField = (document.getElementById('xField') as HTMLInputElement).value = presetDict["bottomRight"]["stampX"]
            var yField = (document.getElementById('yField') as HTMLInputElement).value = presetDict["bottomRight"]["stampY"]
        }
        else if (presetLocate == "customOption"){
            var xField = (document.getElementById('xField') as HTMLInputElement).value = presetDict["customOption"]["stampX"]
            var yField = (document.getElementById('yField') as HTMLInputElement).value = presetDict["customOption"]["stampY"]
        }
        else{
            var xField = (document.getElementById('xField') as HTMLInputElement).value
            var yField = (document.getElementById('yField') as HTMLInputElement).value
        }
    }

    // usign functions
    async function generateSignature() {
        // create token
        var myToken = await axios.post('/api/usign/createUsignToken', {apiKey: apiKey})
        myToken = myToken.data.token

        // authenticate token
        console.log("token is " + myToken)
        await axios.post('/api/usign/authUsignToken', {token: myToken})
        .then((response) => {
            console.log(response)
        })

        // sign document
        const data = {
            "apiKey": apiKey,
            "token": myToken,
            "fileType": "URL",
            // file path should be from our server
            "filePath": "https://internetcikarang.com/wp-content/uploads/2022/10/USIGN-TEST-DOCUMENT.pdf",
            "signList": [
                {
                    "signType": "Digital",
                    "signOption": "Seal",
                    "signPage": "1",
                    "stampX": "450",
                    "stampY": "10",
                    "stampWidth": "120",
                    "stampHeight": "40",
                    "reason": (document.getElementById("reasonForSign") as HTMLInputElement).value, // set by user
                    "reasonCaption": "Reason",
                    "location": (document.getElementById("location") as HTMLInputElement).value, // set by user
                    "locationCaption": "Location"
                },
                {
                    "signType": "Digital",
                    "signOption": "Stamp",
                    "signPage": (document.getElementById("whichPageSign") as HTMLInputElement).value, // set by user
                    "stampType": "URL",
                    "stampPath": "https://www.cellmark.com/wp-content/uploads/2017/03/signature_anniehe.png",
                    "stampX": (document.getElementById("xField") as HTMLInputElement).value, // set by user
                    "stampY": (document.getElementById("yField") as HTMLInputElement).value, // set by user
                    "stampWidth": "60",
                    "stampHeight": "60",
                }
            ]
        }
        // maybe set a loading screen here (takes 5 seconds to generate sign)
        await axios.post('/api/usign/signDocument', data)
        .then((response) => {
            console.log(response.data)
            console.log("redirecting to " + response.data.downloadLink)
            window.location = response.data.downloadLink
        })
        
    }

    // store signature in database
    // do this when click upload sign button
    async function storeSignature() {
        console.log("---saving sign to db---")
        const formData = new FormData();
        formData.append('document', userSign);
        console.log(userSign)
        const config = {
            method: "POST",
            url: "/api/usign/storeSignImage/",
            data: formData,
        }
        const response = await axios(config)
        console.log(response.data)
        console.log("---end of saving sign to db---")
    }

    async function storePdf () {
        // save document to database
        console.log("---saving doc to db---")
        const formData = new FormData();
        formData.append('document', userDoc)
        console.log(userDoc)

        const config = {
            method: "POST",
            url: "/api/usign/storePdf/",
            data: formData,
        }

        const response = await axios(config)
        console.log(response.data)
        console.log("---end of saving doc to db---")
    }

    function setTheUserDoc(file: any) {
        setUserDoc(file)
    }

    function setTheUserSign(file: any) {
        setUserSign(file)
    }

    function Dashboard() {
        if (!user) {
            return <h1>Loading..</h1>
        }
        else {
            return (
            <div className="all">
            <Header />
            <div className='dashboard'>
                <h1 className='sectionTitle'>Creating A Digital Signature Has Never Been Easier!</h1>
                <h3 className='sectionSubtitle'>Upload a document you want to sign and fill in the necessary information below</h3>

                <div className='middleContainer'>
                <form>
                    <div className='docContainer'>
                        <div className='leftUploadDoc'>
                            <div className='leftWrapper'>
                                <p className='fileName' id="docField">No file chosen</p>
                            </div>

                            <div className='rightWrapper'>
                                <label htmlFor="docInput" className='labelInputWrapper'>
                                    <p className="mobileHidden inputBtnLabel">Upload File</p>
                                    <FontAwesomeIcon icon={faUpload} className="inputBtn" />
                                </label>
                                {/* <input type="file" id="docInput" accept="application/pdf" onChange={(e) => {setUserDoc(e.target.files)}}/> */}
                                <input type="file" id="docInput" accept="application/pdf" onChange={(e) => {setTheUserDoc(e.target.files[0])}} />
                            </div>
                        </div>
                        <div id="cancelDocInput" className='cancelDocClass' onClick={removeUploadedDoc}>
                            <p className='removeDocLabel'>Remove File</p>
                            <FontAwesomeIcon icon={faTrash}/>
                        </div>
                    </div>

                    <div className='signContainer'>
                        <div className='rightUploadSign'>
                            <div className='leftWrapper'>
                                <p className='fileName' id="signField">No signature chosen</p>
                            </div>

                            <div className='rightWrapper'>
                                <label htmlFor="signInput" className='labelInputWrapper'>
                                    <p className="mobileHidden inputBtnLabel">Upload Signature</p>
                                    <FontAwesomeIcon icon={faUpload} className="inputBtn" />
                                </label>
                                {/* <input type="file" id="signInput" accept="image/png" onChange={(e) => {setUserSign(e.target.files)}}/> */}
                                <input type="file" id="signInput" accept="image/png" onChange={(e) => {setTheUserSign(e.target.files[0])}}/>
                            </div>
                        </div>
                        <div id="cancelSignInput" className='cancelSignClass' onClick={removeUploadedSign}>
                            <p className='removeSignLabel'>Remove All</p>
                            <FontAwesomeIcon icon={faTrash}/>
                        </div>
                    </div>
                </form>
                </div>
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
                            Location<br/>
                            <input type = "text" id = "location" required/><hr className='spacing'/>
                        </div>
                        <div className='col-6 col-sm-12'>
                            Select page to sign<br/>
                            <input type = "text" id = "whichPageSign" required/><hr className='spacing'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 col-sm-12'>
                            Preset<br/>
                            <select id = "presetLocate" onChange={takePresetCoordinates}>
                                <option value='customOption'>Custom</option>
                                <option value='topLeft'>Top left</option>
                                <option value='topMid'>Top middle</option>
                                <option value='topRight'>Top right</option>
                                <option value='midLeft'>Middle left</option>
                                <option value='midRight'>Middle right</option>
                                <option value='bottomLeft'>Bottom left</option>
                                <option value='bottomMid'>Bottom middle</option>
                                <option value='bottomRight'>Bottom right</option>
                            </select>
                        </div>
                        <div className='col-6 col-sm-12'>
                            Reason<br/>
                            <input type = "text" id = "reasonForSign" required/><hr className='spacing'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 col-sm-12'>
                            Custom<br/>
                            <div>
                                <div className="stampX">
                                    <label className="xField">x:</label>
                                    <input id="xField" name="xField" type="text"/>
                                    <hr className='spacing'/>
                                </div>

                                <div className="stampY">
                                    <label className="yField">y:</label>
                                    <input id="yField" name="yField" type="text"/>
                                    <hr className='spacing'/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-12'>
                            <button type='submit' className='generatesignaturebutton' onClick={generateSignature}>Generate Digital Signature</button>
                        </div>
                    </div>
                </form>
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
