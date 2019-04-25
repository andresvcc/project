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

/*
  componentDidMount() {
    axios.get(`http://localhost:4000/times`)
        .then(res => {
            const values = res.data.ok;
            console.log(values)
            this.setState({values:values});
        })
  }

  timesQuery = () =>{
    axios.get(`http://localhost:4000/times`)
    .then(res => {
      this.setState({values:res.data.ok});
      console.log('logout API response:', res.data);
    })
    .catch(err => { // then print response status
      console.log(err)
    })
}


  handleClick = () => {
    this.timesQuery()
  };
*/

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