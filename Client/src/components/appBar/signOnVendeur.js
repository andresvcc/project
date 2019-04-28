import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import FormNewAcheteur from '../forms/formNewAcheteur'
import FormNewVendeur from '../forms/formNewVendeur'
import {login, logout} from '../../actions/index'

class SignOnAcheteur extends Component{
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
    this.props.back ? this.props.back() : void
    this.setState({ open: false });
    
  };


  /*ln 51, informations */

  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <div style={{visibility:`${this.props.incrireVisibility}`}}>
        <Button variant="outlined" onClick={this.handleClickOpen} style={{minWidth:'200px'}}>
          {this.props.loginStatus ? '' : this.props.title }
        </Button>
        </div>
        <Dialog
            fullScreen={fullScreen}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title">
              <DialogTitle id="responsive-dialog-title">{"Inscrivez-vous"}</DialogTitle>
              <DialogContent style ={{minWidth:'600px'}}>
                <DialogContentText>
                 {}
                </DialogContentText>
              </DialogContent>
              <div style={{paddingBottom:'30px'}}>
                <FormNewVendeur back = {this.handleClose}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignOnAcheteur)