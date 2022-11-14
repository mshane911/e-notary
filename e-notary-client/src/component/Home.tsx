import React from 'react'
import '../styles/home.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

export default function Home()
{
    return(
        <div className = "text">
            <span className ="johndoe">Meet your <b>E-Notary</b>, John Doe</span>
            <br/>
            <span className="help">What can I help you with today?</span>&emsp;
            <span className="needsignature">I need a signature</span>
            <br/><br/><br/><br/>

            <table className="table1">
                <tr>
                    <td className="td1"><p className="ptd1">Upload your document here</p></td>
                    <td className="td2">
                        <a href="#link"><button className="homebuttons"><FontAwesomeIcon icon={faLink} className="ptd2"/></button></a>
                    </td>
                    <td className="td3">
                        <a href="#camera"><button className="homebuttons"><FontAwesomeIcon icon={faCamera} className="ptd3"/></button></a>
                    </td>
                </tr>
            </table>
            <br/>
            <table className="table2">
                <tr>
                    <td className="td4">
                        <a href="#verifythisdocument"><button className="homebuttons"><b>Verify This Document</b></button></a>
                    </td>
                    <td className="blanktd"></td>
                    <td className="td5">
                        <a href="#addyoursignature"><button className="homebuttons"><b>Add Your Signature</b></button></a>
                    </td>
                </tr>
            </table>
        </div>
    )
}