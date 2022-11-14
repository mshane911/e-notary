import React from 'react'
import '../styles/signaturepage.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { text } from 'stream/consumers'

export default function SignaturePage(){
    return(
        <div className="text">
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
            <form method='get'>
            <span className='filenametext'>You have uploaded <b>filename.pdf</b></span>
            <button type='reset' className='cancelbutton'>Cancel</button>
            <br/><br/><br/><br/>
            <table className="signtable">
                <tr>
                    <td></td>
                    <td className="blankgap"></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td className="blankgap"></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td className="blankgap"></td>
                    <td></td>
                </tr>
            </table>
            <br/>
            <button type='submit' className='generatesignaturebutton'>Generate Digital Signature</button>
            </form>
        </div>
    )
}