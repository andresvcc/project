import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import CardListRestaurant from '../components/cards/cardListRestaurant'
import { ToastContainer , toast} from "react-toastify";
import ButtonAdd from '../components/buttons/buttonLogoAdd'

//import { Button } from '@material-ui/core';
const styles = {
  buttonAddRestaurant:{ 
    position:'fixed', 
    bottom:'20%', 
    right:'5%'
  }
}

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
    let photoNameRevise = photoName === 'null.jpg' ? 'null' : photoName // s'il n'a pas de photo eviter de eliminer la photo par defaut car ceci est partagé par plusieurs cardbox
    axios.post(`http://localhost:4000/delRestaurant`,{id:this.props.sessID, nom:nom, photoName:photoNameRevise})
    .then(res => {
        let ok = res.data.ok ? 
            this.updateListRestaurant() : 
            toast.error('probleme, imposible emiliner ce restaurant')
        console.log(ok,res.data)
    })
    console.log('subir delet', nom)
  }

  componentWillMount = () => {
    this.updateListRestaurant()
  }

  render() {
    //const {count, loginStatus, typeUser, surname, sessID}=this.props
    return(
        <div>
          <div style ={styles.buttonAddRestaurant}>
            <ButtonAdd action ={this.updateListRestaurant}/>
          </div>
          <div >
            <CardListRestaurant 
              values ={this.state.values} 
              eliminer={this.eliminerRestaurant}
            ></CardListRestaurant>
          </div>
          <ToastContainer autoClose={2000} position={'top-center'}/>
        </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    sessID: state.counter.sessID
  }
}

export default connect(mapStateToProps)(PageVendeur)