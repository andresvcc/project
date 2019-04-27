import React, {Component} from 'react'
import {connect} from 'react-redux'
//import axios from 'axios'
import CardController from '../components/cards/cardController'
import { ToastContainer } from "react-toastify";

//import { Button } from '@material-ui/core';


class PageVendeur extends Component{
  render() {
    //const {count, loginStatus, typeUser, surname, sessID}=this.props
    return(
        <div>
            <h1>page vendeur</h1>

        <CardController/>      
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