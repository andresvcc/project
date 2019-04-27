import React from 'react'
import FooterU from './footerU'

export default function FooterBar() {
    return (
        <FooterU>
            <h5 className="title" style={{position:'absolute', top:'0%'}}>Information de contact</h5>
            <p style={{position:'absolute', top:'30%'}}>
              Project transversal 1 2019
            </p>
            <label>Andres Caballero & Alex Erne</label>
            <div className="text-center py-3" style={{position:'absolute', marginTop:'auto', top:'0%', right:'50%'}}>
                <h5 className="title">Documents</h5>
                    <ul>
                    <li className="list-unstyled">
                        <a href="#!">Raport Final</a>
                    </li>
                    </ul>
            </div>
        </FooterU>
    )
}