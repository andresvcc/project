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
            nom:'',
            prenom:'',
            address:'',
            ville: 0,
            npa: '',
            bancaire:'',
            erroSurnom: false,
            errorPassword: false,
            errorPassword2: false,
            errorMail: false,
            errorNPA: false,
            errorNom:false,
            errorPrenom:false,
            errorAddress:false,
            errorBancaire:false,
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

    updateInputNom = (evt) => {
        this.setState({
            nom: evt.target.value,
            errorNom: false
        });
    }

    updateInputPrenom = (evt) => {
        this.setState({
            prenom: evt.target.value,
            errorPrenom: false
        });
    }

    updateInputAddress = (evt) => {
        this.setState({
            address: evt.target.value,
            errorAddress: false
        });
    }

    updateInputNpa = (evt) => {
        let npa = evt.target.value
        console.log(npa)
        this.setState({
            npa: evt.target.value,
            errorMail: false
        });
    }

    updateOptionVille = (evt) => {
        this.setState({
            ville: evt.target.value
        });
    }

    updateInputBancaire = (evt) => {
        this.setState({
            bancaire: evt.target.value,
            errorBancaire: false
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

        let nom =
            this.state.nom !== '' ?
                this.state.nom : (this.setState({ errorNom: true }), null)
        
        let prenom =
            this.state.prenom !== '' ?
                this.state.prenom : (this.setState({ errorPrenom: true }), null)

        let adresse =
            this.state.address !== '' ?
                this.state.address : (this.setState({ errorAddress: true }), null)

        let quartier =
            this.state.quartier

        let npa =
            this.state.npa !== '' ?
                this.state.npa : (this.setState({ errorNPA: true }), null)

        let bancaire =
            this.state.bancaire !== '' ?
                this.state.bancaire : (this.setState({ errorBancaire: true }), null)

        let data = {
            surnom,
            email,
            password,
            nom,
            prenom,
            adresse,
            quartier,
            npa,
            bancaire
        }

        let oksurnom = surnom !== null ? true : 
                    (toast.error('Le surnom est vide'), false)
        let okemail = email !== null ? true : 
                    (toast.error('Le email est vide'), false)
        let okpassword = password !== null ? true : 
                    (toast.error(`rentrez le meme mot de passe deux fois`), false)
        let oknom = nom !== null ? true : 
                    (toast.error('Le nom est vide'), false)
        let okprenom = prenom !== null ? true : 
                    (toast.error('Le prenom est vide'), false)
        let okaddress = adresse !== null ? true : 
                    (toast.error(`L'address est vide`), false)
        let okbancaire = bancaire !== null ? true : 
                    (toast.error(`il est obligatoire de rentrer une compte bancaire`), false)
        let oknpa = npa !== null ? true : 
                    (toast.error(`le code postal a un format incorect ou est vide`), false)

        let ok = oksurnom & okemail & okpassword & oknom & okprenom & okaddress & okbancaire & oknpa?

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
        console.log(ok)
    }

    /*
                <div style={{position:'absolute'}}>
                    <h6>Surnom:{this.state.surnom}</h6>
                    <h6>password:{this.state.password}</h6>
                    <h6>email:{this.state.email}</h6>
                    <h6>npa:{this.state.npa}</h6>
                    <h6>ville:{this.state.ville}</h6>
                    <h6>nom:{this.state.nom}</h6>
                    <h6>prenom:{this.state.prenom}</h6>
                    <h6>address:{this.state.address}</h6>
                    <h6>bancaire:{this.state.bancaire}</h6>
                </div>
    */

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="offset-md-1 col-md-16">
                            <div >
                                <legend>Informations nouveau Vendeur</legend>
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
                                    <legend>Informations personelles</legend>
                                    <div className='form-inline'>
                                        <div className='form-check mb-2 mr-sm-2'>
                                            <TextForm
                                                label='Nom'
                                                into='Rentrez votre nom'
                                                back={this.updateInputNom}
                                                error={this.state.errorNom}>
                                            </TextForm>
                                        </div>
                                        <div className='form-check mb-2 mr-sm-2'>
                                            <TextForm
                                                label='Prenom'
                                                into='Rentrez votre prenom'
                                                back={this.updateInputPrenom}
                                                error={this.state.errorPrenom}>
                                            </TextForm>
                                        </div>
                                    </div>
                                    <div className='form-inline'>
                                        <div className='form-check mb-2 mr-sm-2'>
                                            <TextForm
                                                label='Address'
                                                into='Rentrez votre Address'
                                                back={this.updateInputAddress}
                                                error={this.state.errorAddress}>
                                            </TextForm>
                                        </div>
                                    </div>
                                    <div className='form-inline'>
                                        <div className='form-check mb-2 mr-sm-2'>
                                            <ListOption
                                                label='ville'
                                                categories=':4000/villes'
                                                into={this.state.quartier}
                                                default='en dehors de la suisse'
                                                back={this.updateOptionVille}>
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
                                <div>
                                    <TextForm
                                        label='numéro de compte bancaire'
                                        into='Rentrez le numéro de votre compte bancaire'
                                        back={this.updateInputBancaire}
                                        error={this.state.errorBancaire}>
                                    </TextForm> 
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
