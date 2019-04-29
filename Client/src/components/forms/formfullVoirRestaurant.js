import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import EditRestaurant from './formEditRestaurant'
import ButtonAddProduit from '../buttons/buttonProduitAdd'
import CardControllerProduit from '../cards/cardControllerProduit'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullVoir extends React.Component {
  state = {
    open: false,
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
        <Button color='primary' size="small" onClick={this.handleClickOpen}>
          Editer
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          style={{top:'4%'}}
        >
          <AppBar className={classes.appBar} style={{backgroundColor: "#F48964"}}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {this.props.title}
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className="form-row">
            <div className="col">
                <EditRestaurant
                    nom = {this.props.title}
                    description = {this.props.description}
                    adresse = {this.props.adresse}
                    tel = {this.props.tel}
                    quartier = {this.props.quartier}
                />
            </div>
            <div className="col" style={{right:'10%'}}>
                <List>
                  <CardControllerProduit/>
                  <div>
                    <ButtonAddProduit restaurant ={this.props.title} action ={this.updateListRestaurant}/>
                  </div>
                </List>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

FullVoir.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullVoir);