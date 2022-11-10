import React from 'react'
import '../styles/profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

export default function Profile(){
    return (
        <div className='line'>
            <div className='profile'>
                <FontAwesomeIcon icon={faCircleUser} className='profileIcon2'/>
                <input type = "text" id = "profileName" className='profileName1' placeholder='Full Name' disabled/>
                <p>Personal Account</p>
            </div>
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
            </table>

        </div>
    )
}