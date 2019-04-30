import React from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
    flooter: {    
    backgroundColor: "#FFFBF9",
    borderTop: "2px solid #FFDECD",
    padding: "15px",
    position: "relative",
    left: "0%",
    bottom: "0%",
    height: "85px",
    width: "100%",
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