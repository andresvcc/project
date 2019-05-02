import React from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
    flooter: {    
    backgroundColor: "#FFFBF9",
    borderTop: "2px solid #FFDECD",
    position: "absolute",
    paddingLeft:'40px',
    width:'100%',
    minHeight:'85px'
    }
}

function FooterU(props) {
    const {classes, children} = props;
    return (
        <div className= {classes.flooter}>
            <div>
                { children }
            </div>
        </div>
    )
}

FooterU.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterU);