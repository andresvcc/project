import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FooterU from './footerU'

const styles={
    footerBarTitle:{
        lineHeight :'8px'
    },
    footerBarDocuments:{

    }
}

function FooterBar(props) {
    const {classes} =  props
    return (
        <FooterU>
        <div className="form-row">
            <div className="col-md-6">
            <div className= {classes.footerBarTitle}>
                <h5>Information de contact</h5>
                <label>Andres Caballero & Alex Erne</label>
                <p>Project transversal 1, 2019, unige </p>
            </div>
            </div>
            <div className="col-md-5">
            <div className= {classes.footerBarDocuments}>
                <h5 className="title">Documents</h5>
                    <ul>
                    <li className="list-unstyled">
                        <a href="#!">Raport Final</a>
                    </li>
                    </ul>
            </div>
            </div>
        </div>
        </FooterU>
    )
}

FooterBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterBar);