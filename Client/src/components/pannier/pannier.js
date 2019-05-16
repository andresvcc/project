import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CardListProduitPannier from '../cards/cardListProduitPannier'
import { toast } from 'react-toastify';
import {updatePanier} from '../../actions/index'
import ScreenAchats from '../fullScreen/screenAchats'

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: '#FFF8F5',
      overflow: 'auto',
      maxHeight: 280,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  });





function AlignItemsList(props) {

  const panierListUpdate = () =>{
    let data = {
      id: props.sessID
    }
    axios.post(`http://localhost:4000/listPanier`, data )
    .then(res => {
        console.log(res.data)
        let ok = res.data.ok ? (
            props.ajouterPanier(res.data.response),
            true 
        ):(
            false
        )
        ok ?   toast.success('Payement efectue') : console.log('UPDATE PANIER problem')
    })
    .catch(err => { // then print response status
        console.log(err)
    })
  }

  const onClikPayer = () =>{
    console.log('payer', props.produitPanier)
    axios.post(`http://localhost:4000/newAchat`, {id:props.sessID})
        .then(res => {
            res.data.ok ? panierListUpdate() : toast.error(res.data.msg)
        })
        .catch(err => { // then print response status
            console.log(err)
        })
}



  const { classes } = props;
  return (
    <div style={{position:'fixed', backgroundColor: '#FFF8F5', zIndex:3, textAlign:'center'}}>
        <h5>Panier d'achat de {props.surname}</h5>
        <List className={classes.root} subheader={<li />}>
            <CardListProduitPannier/>
        </List>
        <button type="button" className="btn btn-success btn-block" onClick={onClikPayer}>Payer {props.panierTotal}.-CHF</button>
        <ScreenAchats/>


    </div>
  );
}

const mapStateToProps = (state) => {

    return {
      count: state.counter.count,
      loginStatus: state.counter.loginStatus,
      typeUser: state.counter.typeUser,
      surname: state.counter.surname,
      sessID: state.counter.sessID,
      produitPanier: state.counter.produitPanier,
      panierTotal: state.counter.panierTotal
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      ajouterPanier: (panierList) => {  
        dispatch(updatePanier(panierList))
      },
    }
  }

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps) (AlignItemsList));