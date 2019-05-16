import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { ToastContainer } from "react-toastify";
import SearchBar from '../components/searchBar/searchBar.js'
import List from '@material-ui/core/List';
import CardListProduitExpo from '../components/cards/cardListProduitExpo';
import BarnerBar from '../components/barnerBar/barnerBar'
import Pannier from '../components/pannier/pannier'
import {updatePanier} from '../actions/index'




//import { Button } from '@material-ui/core';


class PageAcheteur extends Component{

  state = {
    values: [],
    produits:[],
    bio:[],
    produitsDisplay:[],
    produitsRecommande:[],
    bioState:false,
    dernierRecherche:''
  }

  handlerAddClik = ()=>{
    axios.post(`http://localhost:4000/listRestaurants`)
    .then(res => {
        const values = res.data.resultat;
        console.log('liste des restaurants',values)
        this.setState({values:values});
    })
    console.log('aqui')
    
  }

  componentDidMount() {
    axios.post(`http://localhost:4000/listProduits`)
        .then(res => {
            const produits = res.data.response;
            this.setState({produits:produits, produitsDisplay:produits});
        })
        this.panierListUpdate()

  }

  panierListUpdate = () =>{
    let data = {
      id: this.props.sessID
    }
    axios.post(`http://localhost:4000/listPanier`, data )
    .then(res => {
        console.log('list panier',res.data)
        let ok = res.data.ok ? (
            this.props.ajouterPanier(res.data.response),
            true 
        ):(
            false
        )
        ok ?   console.log('UPDATE PANIER ok') : console.log('UPDATE PANIER problem')
    })
    .catch(err => { // then print response status
        console.log(err)
    })
  }

  toNormalised =(cadena)=>{
    // Definimos los caracteres que queremos eliminar
    var specialChars = "!@#$^&%*()+=-[]/{}|:<>?,.";
 
    // Los eliminamos todos
    for (var i = 0; i < specialChars.length; i++) {
        cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }   
 
    // Lo queremos devolver limpio en minusculas
    cadena = cadena.toLowerCase();
 
    // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
    cadena = cadena.replace(/á/gi,"a");
    cadena = cadena.replace(/é/gi,"e");
    cadena = cadena.replace(/í/gi,"i");
    cadena = cadena.replace(/ó/gi,"o");
    cadena = cadena.replace(/ú/gi,"u");
    cadena = cadena.replace(/ñ/gi,"n");
    cadena = cadena.replace(/è/gi,"e");
    return cadena;
 }

  onChangeSearchInput = (evt) => {

    let evtNormalised = this.toNormalised(evt)
    this.setState({dernierRecherche:evtNormalised.toString()})

    let  rechercheNom = this.state.produits.filter( 
          produit => this.toNormalised(produit.nom).indexOf(evtNormalised) > -1 );

    let rechercheDescription = this.state.produits.filter( 
          produit => this.toNormalised(produit.description).indexOf(evtNormalised) > -1 );

    let rechercheRestaurant = this.state.produits.filter( 
          produit => this.toNormalised(produit.restaurants).indexOf(evtNormalised) > -1 );

    let rechercheCategorie = this.state.produits.filter( 
          produit => this.toNormalised(produit.categorie).indexOf(evtNormalised) > -1 );

   // let bio = this.state.produits.filter( produit => produit.bio === 1 );

    let resArray = [].concat(rechercheNom, rechercheDescription, rechercheRestaurant, rechercheCategorie)
    let resultat = resArray.concat().filter((value, indexCurrent, array) => array.indexOf(value) === indexCurrent);
    let resultatBio = resultat.filter( produit => produit.bio === 1 ) 


    console.log({resultat})

    evt.length < 1 ? (
      this.setState({
        produitsDisplay:[],
        produitsRecommande:[],
        bio:[],
      })
    ):(
      this.setState({
        produitsDisplay:resultat,
        produitsRecommande:[],
        bio:resultatBio,
      })
    )
  }

  updateInputBio = (evt) => {   
    this.setState({
        bioState: !this.state.bioState,
    });
  }


  keyEnterSearchInput = (evt) => {
    const resultado = this.state.produits.filter( produit => produit.nom.toLowerCase().indexOf(evt) > -1 );
    console.log(resultado)
  }

  achatProduitDialog = (produit, quantite)=>{

    this.shoppingProduit(produit, quantite)
  }


  shoppingProduit = (produit, quantite)=>{
    let data = {
      produit:produit.nom,
      restaurant:produit.restaurants,
      id: this.props.sessID,
      quantite:quantite
    }

    console.log('add produit panier', data)
    axios.post(`http://localhost:4000/addProduitPanier`, data )
    .then(res => {
        console.log(res.data)
        let ok = res.data.ok ? (
          this.panierListUpdate(), 
            true 
        ):(
          this.panierListUpdate(),
            this.setState({msgerrNom:res.data.msg}),
            false
        )
        ok ?   console.log('Produit ajouté avec success') : console.log('propduit ne pas ajouté')
    })
    .catch(err => { // then print response status
        console.log(err)
    })
  }

  render() {
    //const {count, loginStatus, typeUser, surname, sessID}=this.props
    return(
        <div>
          <div style={{position:'relative', paddingTop:'24px'}}>
          
            <div>
              <SearchBar
                action ={this.onChangeSearchInput}
                keyDawEnter = {this.keyEnterSearchInput}
                bio = {this.updateInputBio}
                bioState = {this.state.bioState}
              />
              <BarnerBar/>
            </div>

            
          </div>
          <div className="form-row" style={{marginTop:'80px'}}>
            <div className="col-md-1" style={{paddingTop:'15%', position:'relative'}}>
              <p></p>
            </div>

            <div className="col-md-4" style={{paddingTop:'14%', paddingLeft:'2%', paddingRight:'5%'}}>
             <Pannier/>
            </div>

            <div className="col-md-2" style={{paddingTop:'15%', position:'relative'}}>

              <p></p>
            </div>

            <div className="col-md-5" style={{paddingTop:'15%'}}>     
              <List>
                <div>
                  <CardListProduitExpo 
                      values ={this.state.bioState? this.state.bio : this.state.produitsDisplay} 
                      shopping={this.achatProduitDialog}
                  ></CardListProduitExpo>
                </div>
              </List> 
            </div>




          </div>
          <ToastContainer autoClose={2000} position={'top-center'}/>
        </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
    loginStatus: state.counter.loginStatus,
    typeUser: state.counter.typeUser,
    surname: state.counter.surname,
    sessID: state.counter.sessID,
    produitPanier: state.counter.produitPanier
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ajouterPanier: (panierList) => {  
      dispatch(updatePanier(panierList))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageAcheteur)