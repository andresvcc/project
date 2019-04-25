import React, {Component} from 'react'
import {connect} from 'react-redux'
//import axios from 'axios'
import { ToastContainer } from "react-toastify";

import AppBar from './components/appBar/appBar'
//import { Button } from '@material-ui/core';


class App extends Component{
  state = {
    values:'vide'
  }

  render() {
    const {count, loginStatus, typeUser, surname, sessID}=this.props
    return(
        <div>
        <h6>Count: {count}, Login :{loginStatus.toString()}, TypeUser :{typeUser}, Surname :{surname}, sessID :{sessID}</h6>
        <AppBar/>       
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

export default connect(mapStateToProps, mapDispatchToProps)(App)