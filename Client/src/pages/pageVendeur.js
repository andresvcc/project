import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import CardController from '../components/cards/cardController'
import { ToastContainer , toast} from "react-toastify";
import ButtonAdd from '../components/buttons/buttonLogoAdd'

//import { Button } from '@material-ui/core';


class PageVendeur extends Component{
  state = {
    values: []
  }

  updateListRestaurant = ()=>{
    axios.post(`http://localhost:4000/listRestaurantVendeur`,{id:this.props.sessID})
    .then(res => {
        const values = res.data.response;
        console.log('cardController',values)
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
    //const {count, loginStatus, typeUser, surname, sessID}=this.props
    return(
        <div>
          <div style ={{ position:'fixed', bottom:'20%', left:'90%'}}>
            <ButtonAdd action ={this.updateListRestaurant}/>
          </div>
          <CardController 
            values ={this.state.values} 
            eliminer={this.eliminerRestaurant}
            voir = {this.voirRestaurant}
          ></CardController>
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

export default connect(mapStateToProps, mapDispatchToProps)(PageVendeur)