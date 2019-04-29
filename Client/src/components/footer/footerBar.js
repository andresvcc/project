import React from 'react'
import FooterU from './footerU'

export default function FooterBar() {
    return (
        <FooterU>
            <div style={{position:'absolute', top:'8%', lineHeight :'5px'}}>
                <h5>Information de contact</h5>
                <p>
                Andres Caballero & Alex Erne
                </p>
                <label>Project transversal 1, 2019, unige </label>
            </div>
            <div style={{position:'absolute', top:'8%', right:'50%', lineHeight :'5px'}}>
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