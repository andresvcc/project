import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { ToastContainer } from "react-toastify";
import SearchBar from '../components/searchBar/searchBar.js'


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
    //this.handlerAddClik()
  }

  onChangeSearchInput = (evt) => {

    console.log(evt)
  
  }

  keyEnterSearchInput = (evt) => {

    console.log(evt)
  
  }


  render() {
    //const {count, loginStatus, typeUser, surname, sessID}=this.props
    return(
        <div>
          <div style={{position:'relative', paddingTop:'24px'}}>
          <div>
            <SearchBar
              action ={this.onChangeSearchInput}
              keyDawEnter = {this.keyEnterSearchInput}
            />
          </div>
          </div>
          <div style={{position:'absolute', paddingTop:'100px', paddingLeft:'100px'}}>
            <h1>page pour les non login</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(PageNotLogin)