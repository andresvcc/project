import React from 'react'
import FooterU from './footerU'

export default function FooterBar() {
    return (
        <FooterU>
            <h5 className="title">Information de contact</h5>
            <p>
              Information relative au Footer du site
            </p>
            <div className="text-center py-3" style={{position:'absolute', marginTop:'auto', top:'0%', right:'50%'}}>
                <h5 className="title">Documents</h5>
                    <ul>
                    <li className="list-unstyled">
                        <a href="#!">Modeles</a>
                    </li>
                    <li className="list-unstyled">
                        <a href="#!">Raport Final</a>
                    </li>
                    </ul>
                <label>Andres Caballero & Alex Erne</label>
            </div>
        </FooterU>
    )
}