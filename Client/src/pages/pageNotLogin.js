import React, {Component} from 'react'
import {connect} from 'react-redux'
//import axios from 'axios'
import { ToastContainer } from "react-toastify";
import CardController from '../components/cards/cardController'
import ButtonAdd from '../components/buttons/buttonLogoAdd'

//import { Button } from '@material-ui/core';


class PageNotLogin extends Component{

  handlerAddClik = ()=>{
    console.log('aqui')
    
  }


  render() {
    //const {count, loginStatus, typeUser, surname, sessID}=this.props
    return(
        <div>
          <div style ={{ position:'fixed', bottom:'20%', left:'90%'}}>
            <ButtonAdd action ={this.handlerAddClik}/>
          </div>
          <CardController></CardController>
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