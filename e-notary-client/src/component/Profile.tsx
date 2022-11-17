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
            
            {/* add save, cancel and edit button */}
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

{/*             
            <hr/>
            <table className = "tableBorder">
                <tr>
                    <td className='tdName'>First Name</td>
                    <td className='space1'></td>
                    <td className='tdPhone'>Phone Number</td>
                </tr>
                <tr>
                    <td className='data1'>
                        <input type = "text" id = "firstName" className = 'textfield1' placeholder='First Name'/><hr/>
                    </td>
                    <td></td>
                    <td className='data2'>
                        <input type = "text" id = "phoneNum" className = 'textfield2' placeholder='Phone Number' /><hr/>
                    </td>
                </tr>
                <tr className='space2'></tr>
                <tr>
                    <td>Last Name</td>
                    <td></td>
                    <td>Email Address</td>
                </tr>
                <tr>
                    <td className='data3'>
                        <input type = "text" id = "lastName" className = 'textfield3' placeholder='Last Name' /><hr/>
                    </td>
                    <td></td>
                    <td className='data4'>
                        <input type = "text" id = "emailAddress" className = 'textfield4' placeholder='Email Address'/><hr/>
                    </td>
                </tr>
                <tr className='space2'></tr>
                <tr>
                    <td>Gender</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <select className='dropdownBox'>
                            <option value = "Female">Female</option>
                            <option value = "Male">Male</option>
                            <option value = "preferNO">Prefer Not To Say</option>
                        </select>
                    </td>
                </tr>
                <tr className='space2'></tr>
                <tr>
                    <td>Country</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr className='data5'>
                    <input type = "text" id = "country" className = 'textfield5' placeholder='Country'/><hr/>
                </tr>
                <tr className='saveNcancelTR'>
                    <td>
                        <a href = "#save"><button className='saveButton' id = "save">Save</button></a>
                    </td>
                    <td className='space3'></td>
                    <td>
                        <a href = "#cancel"><button className='cancelButton' id = "cancel">Cancel</button></a>
                    </td>
                </tr>
            </table> */}

        </div>
    )
}