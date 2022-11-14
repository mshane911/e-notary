import React, { useEffect } from 'react'
import '../styles/home.css'
import Header from './Header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

export default function Home(){
    useEffect(() => {
        document.title = "Welcome to your dashboard"
    })
    
    // TODO: Get user name
    return(
        <div>
            <Header />

            <div className='text'>
                <span className ="johndoe">Meet your <b>E-Notary</b>, John Doe</span>
                <br/>
                <span className="help">What can I help you with today?</span>&emsp;
                <span className="needsignature">I need a signature</span>
                <br/><br/><br/><br/>

                <table className="table1">
                    <tr>
                        <td className="td1"><p className="ptd1">Upload your document here</p></td>
                        <td className="td2">
                            <a className="clickable" href="#link"><FontAwesomeIcon icon={faLink} className="ptd2"/></a>
                        </td>
                        <td className="td3">
                            <a className="clickable" href="#camera"><FontAwesomeIcon icon={faCamera} className="ptd3"/></a>
                        </td>
                    </tr>
                </table>
                <br/>
                <table className="table2">
                    <tr>
                        <td className="td4">
                            <a className="clickable" href="#verifythisdocument"><button><b>Verify This Document</b></button></a>
                        </td>
                        <td className="blanktd"></td>
                        <td className="td5">
                            <a className="clickable" href="#addyoursignature"><button><b>Add Your Signature</b></button></a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}