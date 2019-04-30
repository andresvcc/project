import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormNewRestaurant from '../forms/formNewRestaurant';



export default class ButtonAdd extends Component{
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.back ? this.props.back() : void
    this.setState({ open: false });
  };

  render() {
    const { fullScreen, Transition} = this.props;
    return (
      <div>
        <div style={{textAlign:'center'}}>
        <Fab size="large" color="secondary" aria-label="Add" className={'margin'} onClick={this.handleClickOpen} >
            <AddIcon />
        </Fab>
        <h6>Restaurant</h6>
        </div>
          <Dialog
            fullScreen={fullScreen}
            open={this.state.open}
            TransitionComponent={Transition}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title">
              <DialogContent style ={{minWidth:'600px'}}>
              </DialogContent>
              <div style={{paddingBottom:'30px'}}>
                <FormNewRestaurant back = {this.handleClose} action={this.props.action}/>
              </div>
          </Dialog>
      </div>
    );
  }
}