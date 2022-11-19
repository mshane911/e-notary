import React from 'react'
import '../styles/profile.css'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faPencil, faArrowDown } from '@fortawesome/free-solid-svg-icons'

export default function Profile(){

    function editForm(){
        const staticForm = document.getElementById("displayOnlyInfo")
        const editableForm = document.getElementById("editableInfo")

        staticForm.style.display = "none"
        editableForm.style.display = "block"
    }

    function displayForm(){
        const staticForm = document.getElementById("displayOnlyInfo")
        const editableForm = document.getElementById("editableInfo")

        staticForm.style.display = "block"
        editableForm.style.display = "none"
    }

    return (
        <div className='line'>
            <Header />

            <div id='displayOnlyInfo'>
                <div className='profile'>
                    <FontAwesomeIcon icon={faCircleUser} className='userPic'/>
                    <h1 id='profileName'>John Doe</h1>
                    <FontAwesomeIcon icon={faPencil} id="editNameBtn" />
                    <p id="profileUserType">Personal Account</p>
                </div>
            
                <div className='row'>
                    <div className='col-6 col-sm-12 displaySection'>
                        <p className='formCategory'>Gender</p>
                        <p className="displayCategory">Male</p>
                    </div>
                    <div className='col-6 col-sm-12 displaySection'>
                        <p className='formCategory'>Phone Number</p>
                        <p className="displayCategory">1234567890</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 col-sm-12 displaySection'>
                        <p className='formCategory'>Country</p>
                        <p className="displayCategory">Singapore</p>
                    </div>
                    <div className='col-6 col-sm-12 displaySection'>
                        <p className='formCategory'>Email Address</p>
                        <p className="displayCategory">mail@mail.com</p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-12 editBtnWrapper'>
                        <button id="editBtn" onClick={editForm}>Edit Profile</button>
                    </div>
                </div>
            </div>
            
            <div id='editableInfo'>
                <form>
                    <div className='profile'>
                        <FontAwesomeIcon icon={faCircleUser} className='userPic'/>
                        <h1 id='profileName'>John Doe Editable</h1>
                        <p id="profileUserType">Personal Account</p>
                    </div>
                
                    <div className='row'>
                        <div className='col-6 col-sm-12 displaySection'>
                            <p className='formCategory'>Gender</p>
                            <div className='select'>
                                <select id="standard-select">
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-6 col-sm-12 formSection'>
                            <p className='formCategory'>Phone Number</p>
                            <div className='inputWrapper'>
                                <input type="number" placeholder='1234567890' />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 col-sm-12 formSection'>
                            <p className='formCategory'>Country</p>
                            <input type="number" placeholder='Singapore' />
                        </div>
                        <div className='col-6 col-sm-12 formSection'>
                            <p className='formCategory'>Email Address</p>
                            <input type="number" placeholder='mail@mail.com' />
                        </div>
                    </div>
                    <div className='row'>
                    <div className='col-12 saveBtnWrapper'>
                        <button id="saveBtn" onClick={displayForm}>Save Changes</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}