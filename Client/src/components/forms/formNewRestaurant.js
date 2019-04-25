import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//composants
import TextForm from './textForm';
import ListOption from './option';
import TextArea from './textarea';

export default class FormNewRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0,
            filename: '',
            name: '',
            description: '',
            address:'',
            telephone:'',
            quartier:0,
            fileCharged: 'cliker ici pour charger une photo',
            errorNom: false,
            errorAddress:false,
            errorTelephone:false,
            errorQuartier:false
        }
    }

    onTerminer = () => {
        let ok = this.state.name !== '' ? (
            this.uploadFile()
        ) : (
                this.setState({ errorNom: true }),
                toast.error('Le nom est vide'),
                false
            )
        return ok
    }

    onAnuller  = () =>{
        this.props.back();
    }

    onChangeHandler = event => {
        var files = event.target.files
        // if return true allow to setState
        this.setState({
            selectedFile: files,
            loaded: 0,
            fileCharged: 'la photo à été chargé, apuier sur terminer pour envoyer le formulaire'
        })
    }

    uploadFile = () => {
        const data = new FormData()
        let ok = this.state.selectedFile != null ? (
            data.append('file', this.state.selectedFile[0]),
            axios.post("http://localhost:4000/upload", data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
                .then(res => { // then print response status
                    var filename = res.data[0]['filename']
                    this.setState({ filename: filename })
                    this.terminerSumit()
                })
                .catch(err => { // then print response status
                    toast.error('upload fail')
                }),
            true
        ) : (
                this.terminerSumit(),
                false
        )
        return ok
    }

    terminerSumit = () => {
        /* ici on va mettre la requette pour ajouter un nouveau produit */
        let nom =
            this.state.name !== '' ?
                this.state.name : null

        let photoName =
            this.state.filename

        let description =
            this.state.description
        
        let adress =
            this.state.address

        let quartier =
            this.state.quartier

        let telephone =
            this.state.telephone

        let data = {
            nom,
            description,
            photoName,
            adress,
            quartier,
            telephone
        }
        
        let ok = data.nom ? (
            toast.success('le restaurant a été ajouté avec success',{
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            }),
            this.setState({ errorNom: false }),
            console.log(data),
            this.props.back(),
            true
        ):(
            toast.error('Rentre le nom',{
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            }),
            this.setState({ errorNom: true }),
            false
        )
        return ok
    }

    updateInputName = (evt) => {
        this.setState({
            name: evt.target.value,
            errorNom: false
        });
    }

    updateInputDescription = (evt) => {
        this.setState({
            description: evt.target.value
        });
    }

    updateInputAddress = (evt) => {
        this.setState({
            address: evt.target.value,
            errorAddress: false
        });
    }

    updateInputTelephone = (evt) => {
        this.setState({
            telephone: evt.target.value,
            errorTelephone: false
        });
    }

    updateOptionQartier = (evt) => {
        this.setState({
            quartier: evt.target.value,
            errorQuartier:false
        });
    }

    /*
    
        <div style={{ position: 'absolute' }}>
            <h6>nom:{this.state.name}</h6>
            <h6>description:{this.state.description}</h6>
            <h6>address:{this.state.address}</h6>
            <h6>telephone:{this.state.telephone}</h6>
            <h6>quartier:{this.state.quartier}</h6>
            <h6>image:{this.state.filename}</h6>
        </div>

    */

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <div >
                            <legend>Ajouter un nouveau restaurant</legend>
                            <div>
                                <TextForm
                                    label='Nom'
                                    into='Rentrez le nom'
                                    back={this.updateInputName}
                                    error={this.state.errorNom}>
                                </TextForm>
                                <TextArea
                                    label='Description'
                                    into={'Rentez une description'}
                                    back={this.updateInputDescription}>
                                </TextArea>
                                <div className='form-inline'>
                                    <div className='form-check mb-2 mr-sm-2'>
                                        <TextForm
                                            label='Address'
                                            into='Rentrez votre Address'
                                            back={this.updateInputAddress}
                                            error={this.state.errorAddress}>
                                        </TextForm>
                                    </div>
                                    <div className='form-check mb-2 mr-sm-2'>
                                        <TextForm
                                            label='Tel'
                                            into='numéro telephonique'
                                            back={this.updateInputTelephone}
                                            error={this.state.errorTelephone}>
                                        </TextForm>
                                    </div>
                                    <div className='form-check mb-2 mr-sm-2'>
                                        <ListOption
                                            label='Quartier'
                                            categories=':4000/location'
                                            into={this.state.quartier}
                                            default='sans quartier'
                                            back={this.updateOptionQartier}>
                                        </ListOption>
                                    </div>
                                </div> 
                            </div>
                            <div className="form-group">
                                <label htmlFor="file" className="label-file">{this.state.fileCharged}
                                    <input
                                        type="file"
                                        className="form-control-range label-file btn btn-primary"
                                        onChange={this.onChangeHandler}>
                                    </input>
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <Progress
                                max="100"
                                color="success"
                                className="form-control-range label-file"
                                value={this.state.loaded}
                            >{Math.round(this.state.loaded, 2)}%</Progress>
                        </div>
                        <button type="button" className="btn btn-success btn-block" onClick={this.onTerminer}>Terminer</button>
                        <button type="button" className="btn btn-link btn-block border" onClick={this.onAnuller}>Anuler</button>
                    </div>
                </div>
            </div>
        );
    }
}

