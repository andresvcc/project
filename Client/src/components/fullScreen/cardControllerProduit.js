import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import CardListProduit from '../cards/cardListProduit';
import { toast} from "react-toastify";

class CardControllerProduit extends Component {
    state = {
        values: []
      }
    
      updateListRestaurant = ()=>{
        axios.post(`http://localhost:4000/listRestaurantVendeur`,{id:this.props.sessID})
        .then(res => {
            const values = res.data.response;
            console.log('liste des produits',values)
            this.setState({values:values});
        })   
      }
    
      eliminerRestaurant = (nom, photoName) =>{
        let photoNameRevise = photoName === 'null.jpg' ? 'null' : photoName
        axios.post(`http://localhost:4000/delRestaurant`,{id:this.props.sessID, nom:nom, photoName:photoNameRevise})
        .then(res => {
            let ok = res.data.ok ? 
                this.updateListRestaurant() : 
                toast.error('probleme, imposible emiliner ce restaurant')
            console.log(ok,res.data)
        })
        console.log('subir delet', nom)
      }
    
      voirRestaurant = (nom, photoName) =>{
        console.log('aqui voir', nom, photoName)
      }
    
      componentWillMount = () => {
        this.updateListRestaurant()
      }

    render() {
        return (
            <div >
                <CardListProduit 
                    values ={this.state.values} 
                    eliminer={this.eliminerRestaurant}
                    voir = {this.voirRestaurant}
                ></CardListProduit>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(CardControllerProduit)