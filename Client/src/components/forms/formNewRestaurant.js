import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import { Progress } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//composants
import TextForm from './textForm';
import ListOption from './option';
import TextArea from './textarea';

class FormNewRestaurant extends Component {
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
        let id = this.props.sessID
        
        let nom =
            this.state.name !== '' ?
                this.state.name : null

        let photoName =
            this.state.filename !== '' ?
                this.state.filename : 'null.jpg'

        let description =
            this.state.description !== '' ?
                this.state.description : '-'
        
        let adresse =
            this.state.address 

        let quartier =
            this.state.quartier !== '' ?
                this.state.quartier : '-'

        let telephone =
            this.state.telephone !== '' ?
                this.state.telephone : '-'
            
        let data = {
            id,
            nom,
            description,
            photoName,
            adresse,
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
            this.newAcheteurQuery(data),
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

    newAcheteurQuery = (data) =>{
        console.log('evoie', data)
        axios.post(`http://localhost:4000/newRestaurant`, data )
        .then(res => {
            console.log(res.data)
            let ok = res.data.ok ? (
                console.log('Restaurant ajouté avec success'), 
                this.props.action(),
                true 
            ):(
                this.setState({msgerrNom:res.data.msg}),
                toast.error(res.data.msg), 
                false
            )
            ok ?   this.props.back() : console.log('restaurant ne pas ajouté')
        })
        .catch(err => { // then print response status
            toast.error('information incorrecte')
            console.log(err)
        })
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
                    <div className="offset-sm-1 col-sm-10">
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
                                <div className="form-row">
                                        <div className="col">
                                            <TextForm
                                                label='Adresse'
                                                into='Rentrez votre Adresse'
                                                back={this.updateInputAddress}
                                                error={this.state.errorAddress}>
                                            </TextForm>
                                        </div>
                                        <div className="col">
                                            <TextForm
                                                label='Tel'
                                                into='Numéro telephonique'
                                                back={this.updateInputTelephone}
                                                error={this.state.errorTelephone}>
                                            </TextForm>
                                        </div>
                                    </div>
                                <div>
                                    <ListOption
                                        label='Quartier'
                                        categories=':4000/location'
                                        into={this.state.quartier}
                                        default='Banlieue'
                                        back={this.updateOptionQartier}>
                                    </ListOption>
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

const mapStateToProps = (state) => {
    return {
      sessID: state.counter.sessID
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {

    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FormNewRestaurant)

