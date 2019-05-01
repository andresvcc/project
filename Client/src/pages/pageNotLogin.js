import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { ToastContainer } from "react-toastify";
import SearchBar from '../components/searchBar/searchBar.js'
import List from '@material-ui/core/List';
import CardListProduit from '../components/cards/cardListProduitExpo';




//import { Button } from '@material-ui/core';


class PageNotLogin extends Component{

  state = {
    values: [],
    produits:[],
    bio:[],
    produitsDisplay:[]
  }

  handlerAddClik = ()=>{
    axios.post(`http://localhost:4000/listRestaurants`)
    .then(res => {
        const values = res.data.resultat;
        console.log('cardController',values)
        this.setState({values:values});
    })
    console.log('aqui')
    
  }

  componentDidMount() {
    axios.post(`http://localhost:4000/listProduits`)
        .then(res => {
            const produits = res.data.response;
            this.setState({produits});
            console.log(this.state.produits)
        })
  }

  toNormalised =(cadena)=>{
    // Definimos los caracteres que queremos eliminar
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
 
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
    let resultat = resArray.filter((value, indexCurrent, array) => array.indexOf(value) === indexCurrent);
    let resBio = resultat.filter( produit => produit.bio === 1 );


    console.log({resultat, resBio})

    evt.length < 1 ? (
      this.setState({
        produitsDisplay:[],
        bio:[]
      })
    ):(
      this.setState({
        produitsDisplay:resultat,
        bio:resBio
      })
    )




  }




  keyEnterSearchInput = (evt) => {
    const resultado = this.state.produits.filter( produit => produit.nom.toLowerCase().indexOf(evt) > -1 );
    console.log(resultado)
  }

  eliminerProduit = (nom, photo)=>{
    console.log(nom, photo)
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
            />
          </div>
          </div>
          <div className="form-row" style={{marginTop:'65px'}}>
            <div className="col-md-6" style={{paddingTop:'100px'}}>
            </div>
            <div className="col-md-6">     
              <List>
                <div>
                  <CardListProduit 
                      values ={this.state.produitsDisplay} 
                      eliminer={this.eliminerProduit}
                  ></CardListProduit>
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
    sessID: state.counter.sessID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNotLogin)