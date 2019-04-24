import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* conposant */
import TextForm from './textForm';
import PassForm from './passForm';
import ListOption from './option';
import TextFormLine from './textFormLine';

export default class FormNewAcheteur extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surnom: '',
            password: '',
            password2: '',
            email: '',
            quartier: 0,
            npa: '',
            erroSurnom: false,
            errorPassword: false,
            errorPassword2: false,
            errorMail: false,
            errorNPA: false
        }
    }

    updateInputSurname = (evt) => {
        this.setState({
            surnom: evt.target.value,
            erroSurnom: false
        });
    }

    updateInputPassword = (evt) => {
        this.setState({
            password: evt.target.value,
            errorPassword: false
        });
    }

    updateInputPassword2 = (evt) => {
        this.setState({
            password2: evt.target.value,
            errorPassword2: false
        });
    }

    updateInputEmail = (evt) => {
        this.setState({
            email: evt.target.value,
            errorMail: false
        });
    }

    updateInputNpa = (evt) => {
        this.setState({
            npa: evt.target.value,
            errorMail: false
        });
    }

    updateOptionQartier = (evt) => {
        this.setState({
            quartier: evt.target.value
        });
    }

    terminerSumit = () => {

        let surnom =
            this.state.surnom !== '' ?
                this.state.surnom : (this.setState({ erroSurnom: true }), null)

        let email =
            this.state.email !== '' ?
                this.state.surnom : (this.setState({ errorMail: true }), null)

        let password =
            (this.state.password === this.state.password2) && (this.state.password !== '') ?
                this.state.password : (this.setState({ errorPassword: true, errorPassword2: true }), null)

        let quartier =
            this.state.quartier

        let npa =
            this.state.npa

        let data = {
            surnom,
            email,
            password,
            quartier,
            npa
        }

        let oksurnom = surnom !== null ? true : (toast.error('Le surnom est vide'), false)
        let okemail = email !== null ? true : (toast.error('Le email est vide'), false)
        let okpassword = password !== null ? true : (toast.error(`rentrez le meme mot de passe deux fois`), false)

        let ok = oksurnom && okemail && okpassword ?
            (
                toast.success('👍 le compte a été créé avec succès !', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                }),
                console.log(data),
                true
            ) : (
                toast.warn(`la copmte n'a pas été crée, verifier les champ SVP`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                }),
                false
            )
        console.log('msg? : ',ok)


    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="offset-md-3 col-md-6">
                            <div >
                                <legend>nouveau acheteur</legend>
                                <div>
                                    <TextForm
                                        type='text'
                                        label='Surnom'
                                        into='Rentrez le nom'
                                        back={this.updateInputSurname}
                                        error={this.state.erroSurnom}>
                                    </TextForm>
                                    <PassForm
                                        label='Mot de passe'
                                        into='Password'
                                        msgerror='le mot de passe ne correspondent pas'
                                        back={this.updateInputPassword}
                                        error={this.state.errorPassword}>
                                    </PassForm>
                                    <PassForm
                                        label='Rentrez a nouvau le mot de passe'
                                        into='Password'
                                        msgerror=''
                                        back={this.updateInputPassword2}
                                        error={this.state.errorPassword2}>
                                    </PassForm>
                                    <TextForm
                                        label='Email'
                                        into='Email'
                                        back={this.updateInputEmail}
                                        error={this.state.errorMail}>
                                    </TextForm>
                                    <div className='form-inline'>
                                        <div className='form-check mb-2 mr-sm-2'>
                                            <ListOption
                                                label='Quartier'
                                                categories=':4000/location'
                                                into={this.state.quartier}
                                                default='sans quartier'
                                                back={this.updateOptionQartier}>
                                            </ListOption>
                                        </div>
                                        <div className='form-check mb-2 mr-sm-2'>
                                            <TextFormLine
                                                label='NPA'
                                                into='code postal'
                                                back={this.updateInputNpa}
                                                error={this.state.errorNPA}>
                                            </TextFormLine>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-success btn-block" onClick={this.terminerSumit}>Terminer</button>
                            </div >
                        </div >
                    </div >
                </div >
            </div>
        )
    }
}
