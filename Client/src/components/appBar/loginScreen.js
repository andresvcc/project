import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLogin from '../forms/formLogin'

import {login, logout} from '../../actions/index'

class LoginScreenButton extends Component{
  state = {
    open: false,
  };

  handleBtnActionLogout = () => {

    this.props.onLogoutClick()
  }

  /*
  logoutQuery = () =>{
    axios.post(`http://localhost:4000/userLogout`)
    .then(res => {
      let ok = res.data.ok ? this.handleBtnActionLogout() : console.log('probleme')
      console.log('logout API response:', res.data, ok);
    })
    .catch(err => { // then print response status
      toast.error('un probleme est survenue')
      console.log(err)
    })
}
*/

logoutQuery = () =>{
  axios.post(`http://localhost:4000/userLogout`)
  .then(res => {
    let ok = res.data.ok ? this.handleBtnActionLogout() : console.log('probleme')
    console.log('logout API response:', res.data, ok);
  })
  .catch(err => { // then print response status
    toast.error('un probleme est survenue')
    console.log(err)
  })

  axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    if (error.status === 401) {
      // DELETE YOUR AUTHENTICATE_USER item from localStorage 
    }
    return Promise.reject(error);
  });
}




  handleClickOpen = () => {
    this.props.loginStatus ? this.logoutQuery(): this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <Button color="inherit" onClick={this.handleClickOpen}>
          {this.props.loginStatus ? 'LOGOUT' : 'LOGIN' }
        </Button>
          <Dialog
            fullScreen={fullScreen}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title">
              <DialogTitle id="responsive-dialog-title">{"Login"}</DialogTitle>
              <DialogContent style ={{minWidth:'600px'}}>
                <DialogContentText>
                  Information relative au login.
                </DialogContentText>
              </DialogContent>
              <div style={{paddingBottom:'30px'}}>
                <FormLogin back = {this.handleClose}/>
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
    typeUser: state.counter.typeUser
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenButton)