import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { ToastContainer } from "react-toastify";


//import { Button } from '@material-ui/core';


class PageNotLogin extends Component{

  state = {
    values: []
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

  componentWillMount = () => {
    axios.post(`http://localhost:4000/listRestaurants`)
    .then(res => {
        const values = res.data.resultat;
        console.log('cardController',values)
        this.setState({values:values});
    })
}



  render() {
    //const {count, loginStatus, typeUser, surname, sessID}=this.props
    return(
        <div>
          <h1 style={{position:'absolute',left:'5%' ,top:'20%'}}>Page pour les non login user</h1>
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