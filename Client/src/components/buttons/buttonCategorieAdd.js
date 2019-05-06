import React, {Component} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormNewCategorie from '../forms/formNewCategorie';



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
      <div style={{paddingBottom:'20px'}}>
        <div style={{textAlign:'center'}}>
        <button type="button" className="btn btn-success btn-block" onClick={this.handleClickOpen}>Ajouter Categorie</button>
        </div>
          <Dialog
            fullScreen={fullScreen}
            open={this.state.open}
            TransitionComponent={Transition}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title">
              <DialogContent style ={{minWidth:'500px'}}>
              </DialogContent>
              <div style={{paddingBottom:'30px'}}>
                <FormNewCategorie back = {this.handleClose} action={this.props.action}/>
              </div>
          </Dialog>
      </div>
    );
  }
}