import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import CardListProduitResume from '../cards/cardListProduitResume'


class AlertDialog extends React.Component {
  styles = {
    root: {
      width: '100%',
      maxWidth: 600,
      backgroundColor: '#FFF8F5',
      overflow: 'auto',
      maxHeight: 250,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  };

  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div >
        <Button color="primary" onClick={this.handleClickOpen}>
          resumen
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">ID ACHAT:{' '+this.props.id}</DialogTitle>

          <List style={this.styles.root} subheader={<li />}>
            <CardListProduitResume
              style={{overflow: 'auto'}}
              id={this.props.id}
              total = {this.props.total}
            />
          </List>

          <DialogActions>
            <div style={{marginRight:'60px'}}>
              <h6>TOTAL: {this.props.total}.-CHF</h6>
            </div>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Acepter
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;