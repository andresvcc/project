import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SignOnAcheteur from './signOnAcheteur'
import SingOnVendeur from './signOnVendeur'

import {login, logout} from '../../actions/index'

class SignOn extends Component{
  state = {
    open: false,
  };

  handleBtnActionLogout = () => {
    this.props.onLogoutClick()
  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <div style={{visibility:`${this.props.incrireVisibility}`}}>
        <Button color="inherit" onClick={this.handleClickOpen}>
          {this.props.loginStatus ? '' : "S'inscrire" }
        </Button>
        </div>
          <Dialog
            fullScreen={fullScreen}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
            style ={{minWidth:'600px', textAlign:'center'}}>
              <DialogTitle id="responsive-dialog-title">{"Inscrivez-vous"}</DialogTitle>
              <DialogContent >
                <DialogContentText>
                choisissez l'une des options suivantes.
                </DialogContentText>
              </DialogContent>
              <div style={{paddingBottom:'30px'}}>
              <SignOnAcheteur 
                back = {this.handleClose}
                title = 'Je suis un Acheteur'
                color = 'primary'
              />
              <SingOnVendeur 
                back = {this.handleClose}
                title = 'Je suis un Vendeur'
              />
              </div>
          </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
    loginStatus: state.counter.loginStatus,
    typeUser: state.counter.typeUser,
    incrireVisibility:state.counter.incrireVisibility
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: (typeUser) => {
      dispatch(login(typeUser))
    },
    onLogoutClick: () => {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOn)