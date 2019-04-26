import React, { Component } from 'react';
import axios from 'axios';
//import { Progress } from 'reactstrap';
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
            npa: 0,
            erroSurnom: false,
            errorPassword: false,
            errorPassword2: false,
            errorMail: false,
            errorNPA: false,
            msgerrNom:'le champ Surnom est obligatoire'
        }
    }

    onAnuller  = () =>{
        this.props.back();
    }

    updateInputSurname = (evt) => {
        this.setState({
            surnom: evt.target.value,
            erroSurnom: false,
            msgerrNom:'le champ Surnom est obligatoire'
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
            errorNPA: false
        });
    }

    updateOptionQartier = (evt) => {
        this.setState({
            quartier: evt.target.value
        });
    }

    terminerSumit = () => {

        let surname =
            this.state.surnom !== '' ?
                this.state.surnom : (this.setState({ erroSurnom: true }), '')

        let email =
            this.state.email !== '' ?
                this.state.email : (this.setState({ errorMail: true }), '')

        let password =
            (this.state.password === this.state.password2) && (this.state.password !== '') ?
                this.state.password : (this.setState({ errorPassword: true, errorPassword2: true }), '')

        let quartier =
            this.state.quartier

        let npa =
        this.state.npa !== '' ?
        this.state.npa : (this.setState({ errorNPA: true }), '')

        let data = {
            surname,
            email,
            password,
            quartier,
            npa
        }

        let oksurname = surname !== '' ? true : (toast.error('Le surnom est vide'), false)
        let okemail = email !== '' ? true : (toast.error('Le email est vide'), false)
        let okpassword = password !== '' ? true : (toast.error(`rentrez le meme mot de passe deux fois`), false)
        let oknpa = npa !== '' ? true : (toast.error(`rentrez le code postal (NPA)`), false)
        let ok = oksurname && okemail && okpassword && oknpa?
            (   
                this.newAcheteurQuery(data),
                true
            ) : (
                toast.warn(`la copmte n'a pas été crée, verifier les champ SVP`),
                false
            )
        console.log('msg? : ',ok)
    }

    newAcheteurQuery = (data) =>{
        axios.post(`http://localhost:4000/NewAcheteur`, data )
        .then(res => {
            console.log(res.data)
            let ok = res.data.ok ? (
                console.log('compte crée'), 
                true 
            ):(
                this.setState({msgerrNom:res.data.msg}),
                toast.error(res.data.msg), 
                false
            )
            ok ?   this.props.back() : console.log('compte ne pas crée')
        })
        .catch(err => { // then print response status
            toast.error('information incorrecte')
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="offset-md-1 col-md-10">
                            <div >
                                <legend>nouveau acheteur</legend>
                                <div>
                                    <TextForm
                                        type='text'
                                        label='Surnom'
                                        into='Rentrez le nom'
                                        msgerror={this.state.msgerrNom}
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
                                                msgerror ='NPA incorrecté'
                                                back={this.updateInputNpa}
                                                error={this.state.errorNPA}>
                                            </TextFormLine>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-success btn-block" onClick={this.terminerSumit}>Terminer</button>
                                <button type="button" className="btn btn-link btn-block border" onClick={this.onAnuller}>Anuler</button>
                            </div >
                        </div >
                    </div >
                </div >
            </div>
        )
    }
}
