import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {login, logout} from '../../actions/index'

//mes composants
import TextForm from './textForm';
import PassForm from './passForm'

class FormLogin extends Component {

    state = {
        surname: '',
        password: '',
        errorSurname: false,
        errorPassword:false
    }
    
    handleBtnActionLogin = (dataUser) => {
        this.props.onLoginClick(dataUser)
    }

    onAnuller  = () =>{
        this.props.back();
    }

    terminerSumit = () => {
        let surname = this.state.surname !== '' ?
                this.state.surname : null

        let password = this.state.password !== '' ?
                this.state.password : null
        
        let data = {
            surname,
            password,
        }
        
        let okSurname = data.surname ?  true : (
                toast.error('le surnom  es vide'),  
                this.setState({ errorSurname: true}), 
                false)

        let okPassword = data.password ? true : (
                toast.error('le mot de passe est vide', 
                this.setState({ errorPassword: true}), 
                false))

        let ok = okSurname & okPassword ? (
            console.log('data login :', data),
            this.loginQuery(data),
            true
        ):(
            false
        )
        return ok
    }
      
    loginQuery = (data) =>{
        axios.post(`http://localhost:4000/userlogin`, data )
        .then(res => {
            let ok = res.data.ok && res.data.typeUser? (   
                    this.handleBtnActionLogin(res.data), 
                    true
                ):(
                    this.setState({errorSurname:true, errorPassword:true}), false)
            ok ?    this.props.back() : toast.error('surname ou mot de passe incorrecte')

        })
        .catch(err => { // then print response status
            toast.error('surname ou mot de passe incorrecte')
            console.log(err)
        })
    }

    updateInputSurname = (evt) => {
        this.setState({
            surname: evt.target.value,
            errorSurname: false
        });
    }

    updateInputPassword = (evt) => {
        this.setState({
            password: evt.target.value,
            errorPassword: false
        });
    }

    render() {
        return (
            <div className="container">
            
                <div className="row">
                    <div className="offset-md-1 col-md-10"> 
                        <TextForm
                            label='Surname'
                            into = "Entrez votre nom d'utilisateur"
                            msgerror=' '
                            back={this.updateInputSurname}
                            error={this.state.errorSurname}>
                        </TextForm>
                        <PassForm
                            label='Password'
                            into='Entrez votre mot de passe'
                            msgerror=' '
                            back={this.updateInputPassword}
                            error={this.state.errorPassword}>
                        </PassForm>
                        <button type="button" className="btn btn-success btn-block" onClick={this.terminerSumit}>S'identifier</button>
                        <button type="button" className="btn btn-link btn-block border" onClick={this.onAnuller}>Anuler</button>
                    </div>
                </div>
                
            </div>
        );
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
      onLoginClick: (dataUser) => {
        dispatch(login(dataUser))
      },
      onLogoutClick: () => {
        dispatch(logout())
      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)