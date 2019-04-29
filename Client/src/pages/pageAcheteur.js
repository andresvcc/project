import React, {Component} from 'react'
import {connect} from 'react-redux'
//import axios from 'axios'
import { ToastContainer } from "react-toastify";

//import { Button } from '@material-ui/core';


class PageAcheteur extends Component{
  render() {
   // const {count, loginStatus, typeUser, surname, sessID}=this.props
    return(
        <div >
            <h1 style={{position:'absolute',left:'5%' ,top:'20%'}}>Page pur les acheteur</h1>
              
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

export default connect(mapStateToProps, mapDispatchToProps)(PageAcheteur)