import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginScreenButton from './loginScreen'
import MenuSignOn from './menuSignOn'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

var style = {
  backgroundColor: "#F48964",
  borderTop: "2px solid #FFDECD",
  position: "fixed",
  left: "0",
  top: "0px",
  height: "40px",
  width: "100%",
}

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" style={style}>
        <Toolbar style={{margin:'-12px'}}>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            EastSHOP
          </Typography>
          <MenuSignOn/>
          <LoginScreenButton/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);