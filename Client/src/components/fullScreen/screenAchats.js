import React, { Component } from 'react';
import {connect} from 'react-redux'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardListAchats from '../cards/cardListAchats'
/*
import EditRestaurant from '../forms/formEditRestaurant'
import ButtonAddProduit from '../buttons/buttonProduitAdd'
import CardListProduit from '../cards/cardListProduit';
import { toast} from "react-toastify";
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import axios from 'axios';
*/

const styles = {
  appBar: {
    position: 'fixe',
    backgroundColor: "#F48964"
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ScreenAchats extends Component {
  state = {
    open: false,
    values: []
  };


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
         <button type="button" className="btn btn-secondary btn-block border" onClick={this.handleClickOpen}>Récapitulatif</button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          style={{top:'4%'}}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Achats
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>

          <div className="form-row" style={{marginTop:'65px', background: 'linear-gradient(#FFF8F5, rgba(255,255,255,.999))'}}>
            <div className="col-md-8 " style={{paddingTop:'10%', paddingLeft:'10%'}}>
                  <CardListAchats/>
            </div>
            <div className="col-md-2">     
      
            </div>
            <div className="col-md-2">

            </div>
          </div>

        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    sessID: state.counter.sessID
  }
}

ScreenAchats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)( withStyles(styles)(ScreenAchats));