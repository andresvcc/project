import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {login, logout} from '../../actions/index'
import FormNewRestaurant from '../forms/formNewRestaurant';



const styles = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  });


class ButtonAdd extends Component{
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

  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <div style={{visibility:`${this.props.incrireVisibility}`, textAlign:'center'}}>
        <h6>Restaurant</h6>
        <Fab size="medium" color="secondary" aria-label="Add" className={'margin'} onClick={this.handleClickOpen} >
            <AddIcon />
        </Fab>
        

        </div>
          <Dialog
            fullScreen={fullScreen}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title">
              <DialogTitle id="responsive-dialog-title">{"Inscrivez-vous"}</DialogTitle>
              <DialogContent style ={{minWidth:'600px'}}>
                <DialogContentText>
                  Information relative au registre d'un nouveau acheteur.
                </DialogContentText>
              </DialogContent>
              <div style={{paddingBottom:'30px'}}>
                <FormNewRestaurant back = {this.handleClose}/>
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

export default connect(mapStateToProps, mapDispatchToProps) (ButtonAdd)