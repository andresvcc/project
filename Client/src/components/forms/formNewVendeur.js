import React, { Component } from 'react';
import axios from 'axios';
//import { Progress } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* conposant */
import TextForm from './textForm';
import PassForm from './passForm';

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
            adresse:'',
            bancaire:'',
            errSurnom: false,
            errPassword: false,
            errEmail: false,
            errNom:false,
            errPrenom:false,
            errAdresse:false,
            errBancaire:false,
            msgerrNom:'le champ Surnom est obligatoire'
        }
    }

    onAnuller  = () =>{
        this.props.back();
    }

    updateInputSurname = (evt) => {
        this.setState({
            surnom: evt.target.value,
            errSurnom: false,
            msgerrNom:'le champ Surnom est obligatoire'
        });
    }

    updateInputPassword = (evt) => {
        this.setState({
            password: evt.target.value,
            errPassword: false
        });
    }

    updateInputPassword2 = (evt) => {
        this.setState({
            password2: evt.target.value,
            errPassword: false
        });
    }

    updateInputEmail = (evt) => {
        this.setState({
            email: evt.target.value,
            errEmail: false
        });
    }

    updateInputNom = (evt) => {
        this.setState({
            nom: evt.target.value,
            errNom: false,
        });
    }

    updateInputPrenom = (evt) => {
        this.setState({
            prenom: evt.target.value,
            errPrenom: false,
        });
    }

    updateInputAdresse = (evt) => {
        this.setState({
            adresse: evt.target.value,
            errAdresse: false,
        });
    }

    updateInputBancaire = (evt) => {
        this.setState({
            bancaire: evt.target.value,
            errBancaire: false,
        });
    }



    terminerSumit = () => {

        let surname =
            this.state.surnom !== '' ?
                this.state.surnom : (this.setState({ errSurnom: true }), '')

        let password =
            (this.state.password === this.state.password2) && (this.state.password !== '') ?
                this.state.password : (this.setState({ errPassword: true, errPassword2: true }), '')

        let email =
            this.state.email !== '' ?
                this.state.email : (this.setState({ errEmail: true }), '')
        
        let nom =
            this.state.nom !== '' ?
                this.state.nom : (this.setState({ errNom: true }), '')
    
        let prenom =
            this.state.prenom !== '' ?
                this.state.prenom : (this.setState({ errPrenom: true }), '')        
        let adresse =
            this.state.adresse !== '' ?
                this.state.adresse : (this.setState({ errAdresse: true }), '')

        let bancaire =
            this.state.bancaire !== '' ?
                this.state.bancaire : (this.setState({ errBancaire: true }), '')

        let data = {
            surname,
            email,
            password,
            nom,
            prenom,
            adresse,
            bancaire
        }

        let oksurname = surname !== '' ? true : (toast.error('Le surnom est vide'), false)
        let okemail = email !== '' ? true : (toast.error('Le email est vide'), false)
        let okpassword = password !== '' ? true : (toast.error(`rentrez le meme mot de passe deux fois`), false)
        let oknom = nom !== '' ? true : (toast.error(`le nom est vide`), false)
        let okprenom = prenom !== '' ? true : (toast.error(`le prenom est vide`), false)
        let okadresse = adresse !== '' ? true : (toast.error(`l'adresse est vide`), false)
        let okbancaire = bancaire !== '' ? true : (toast.error(`le numéro de compte bancaire est vide`), false)


        let ok = oksurname & okemail & okpassword & oknom & okprenom & okadresse & okbancaire ?
            (   
                this.newVendeurQuery(data),
                true
            ) : (
                toast.warn(`la copmte n'a pas été crée, verifier les champ SVP`),
                false
            )
        console.log(ok,'data', data)
    }

    newVendeurQuery = (data) =>{
        axios.post(`http://localhost:4000/newVendeur`, data )
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
                                        error={this.state.errSurnom}>
                                    </TextForm>

                                    <PassForm
                                        label='Mot de passe'
                                        into='Password'
                                        msgerror='le mot de passe ne correspondent pas'
                                        back={this.updateInputPassword}
                                        error={this.state.errPassword}>
                                    </PassForm>

                                    <PassForm
                                        label='Rentrez a nouvau le mot de passe'
                                        into='Password'
                                        msgerror=''
                                        back={this.updateInputPassword2}
                                        error={this.state.errPassword}>
                                    </PassForm>

                                    <div className="form-row">
                                        <div className="col">
                                            <TextForm
                                                label='Nom'
                                                into='Nom'
                                                back={this.updateInputNom}
                                                error={this.state.errNom}>
                                            </TextForm>
                                        </div>
                                        <div className="col">
                                            <TextForm
                                                label='Prenom'
                                                into='Nom'
                                                back={this.updateInputPrenom}
                                                error={this.state.errPrenom}>
                                            </TextForm>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col">
                                            <TextForm
                                                label='Adresse'
                                                into='Adresse'
                                                back={this.updateInputAdresse}
                                                error={this.state.errAdresse}>
                                            </TextForm>
                                        </div>
                                        <div className="col">
                                            <TextForm
                                                label='Email'
                                                into='Email'
                                                back={this.updateInputEmail}
                                                error={this.state.errEmail}>
                                            </TextForm>
                                        </div>
                                    </div>

                                    <TextForm
                                        label='Numnéro de compte bancaire'
                                        into='Numnéro de compte bancaire'
                                        back={this.updateInputBancaire}
                                        error={this.state.errBancaire}>
                                    </TextForm>

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