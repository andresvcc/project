import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import EditRestaurant from '../forms/formEditRestaurant'
import ButtonAddProduit from '../buttons/buttonProduitAdd'
import CardListProduit from '../cards/cardListProduit';
import { toast} from "react-toastify";
import Icon from '@material-ui/core/Icon';

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

class ScreenEditRestaurant extends Component {
  state = {
    open: false,
    values: []
  };

  updateListProduit = ()=>{
    axios.post(`http://localhost:4000/listProduitRestaurant`,{restaurant:this.props.title})
    .then(res => {
        const values = res.data.response;
        console.log('list produits',values)
        this.setState({values:values});
    })   
  }

  eliminerProduit = (nom, photoName) =>{
    let photoNameRevise = photoName === 'null.jpg' ? 'null' : photoName
    axios.post(`http://localhost:4000/delProduit`,{id:this.props.sessID, nom:nom, photoName:photoNameRevise, restaurant:this.props.title})
    .then(res => {
        let ok = res.data.ok ? 
            (this.updateListProduit(), 'success'): 
            (toast.error('probleme, imposible emiliner ce produit'), 'probleme')
        console.log('eliminer',ok,res.data)
    })
  }

  handleClickOpen = () => {
    this.updateListProduit()
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
        <Icon>edit_icon</Icon>
        </Button>
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
                {this.props.title}
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className="form-row" style={{marginTop:'65px', background: 'linear-gradient(#FFF8F5, rgba(255,255,255,.999))'}}>
            <div className="col-md-4 " style={{paddingTop:'100px'}}>
                <EditRestaurant
                    nom = {this.props.title}
                    description = {this.props.description}
                    adresse = {this.props.adresse}
                    tel = {this.props.tel}
                    quartier = {this.props.quartier}
                />
            </div>
            <div className="col-md-6">     
                <List>
                  <div>
                    <CardListProduit 
                        values ={this.state.values} 
                        eliminer={this.eliminerProduit}
                    ></CardListProduit>
                  </div>
                </List>        
            </div>
          </div>
          <div className="col-md-1" style={{position:'fixed', right:'5%', top:'10%'}}>
                <div>
                  <ButtonAddProduit restaurant ={this.props.title} action ={this.updateListProduit}/>
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

ScreenEditRestaurant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)( withStyles(styles)(ScreenEditRestaurant));