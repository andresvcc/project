import React, {Component} from 'react'
import {connect} from 'react-redux'
//import axios from 'axios'
import { ToastContainer } from "react-toastify";

//import { Button } from '@material-ui/core';
import PageVendeur from './pageVendeur'
import PageAcheteur from './pageAcheteur'
import PageNotLogin from './pageNotLogin'

class PageController extends Component{

    controllerPage=()=>{
        let typeUser = this.props.typeUser
        switch (typeUser) {
            case 0:
                return <PageNotLogin/>
            case 1:
                return <PageVendeur/>
            case 2:
                return <PageAcheteur/>
            default:
                return <h1>Page d'error</h1>
        }
    }
    
  render() {
   const {count, loginStatus, typeUser, surname, sessID}=this.props
    return(
        <div style={{background: 'linear-gradient(rgba(255,255,255,.91), rgba(255,255,255,.999)), url("http://localhost:4000/photo/fond.jpg")'}}>
          <div style={{minHeight:'90vh',position:'relative'}}>
            <div>
                <h6>Count: {count}, Login :{loginStatus.toString()}, TypeUser :{typeUser}, Surname :{surname}, sessID :{sessID}</h6>
                 {this.controllerPage()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PageController)