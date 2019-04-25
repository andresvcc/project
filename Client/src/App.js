import React, {Component} from 'react'
import {connect} from 'react-redux'
import { ToastContainer } from "react-toastify";

import AppBar from './components/appBar/appBar'


class App extends Component{

  render() {
    const {count, loginStatus, typeUser}=this.props
    return(
        <div>
        <h6>Count: {count}, Login: {loginStatus.toString()}, TypeUser: {typeUser}</h6>
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
    typeUser: state.counter.typeUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)