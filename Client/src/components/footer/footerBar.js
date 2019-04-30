import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FooterU from './footerU'

const styles={
    footerBarTitle:{
        position:'absolute', 
        top:'8%', 
        lineHeight :'8px'
    },
    footerBarDocuments:{
        position:'absolute', 
        top:'8%', 
        right:'50%', 
        lineHeight :'5px'
    }
}

function FooterBar(props) {
    const {classes} =  props
    return (
        <FooterU>
            <div className= {classes.footerBarTitle}>
                <h5>Information de contact</h5>
                <label>Andres Caballero & Alex Erne</label>
                <p>Project transversal 1, 2019, unige </p>
            </div>
            <div className= {classes.footerBarDocuments}>
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

FooterBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterBar);