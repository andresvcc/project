import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//composants
import ListOption from './option';
import TextForm from './textForm';
import TextArea from './textarea';
import CheckBox from './checkBox';

export default class FormNewProduit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0,
            filename: '',
            name: '',
            description: '',
            check: false,
            categorie: 0,
            prixBase: 0,
            fileCharged: 'cliker ici pour charger une photo',
            errorNom: false
        }
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

    onTerminer = () => {
        let ok = this.state.name !== '' ? (
            this.uploadFile() 
        ):(
            this.setState({ errorNom: true }),
            toast.error('Le nom est vide'), 
            false
        )
        return ok
    }

    onAnuller  = () =>{
        this.props.back();
    }

    uploadFile = () => {
        const data = new FormData()
        const ok = this.state.selectedFile != null ? (
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
                toast.error('probleme avec la photo')
                this.setState({ filename: 'err' })
            }),
            true
        ) : (this.terminerSumit(), false)
       return  ok
    }

    terminerSumit = () => {
        /* ici on va mettre la requette pour ajouter un nouveau produit */
        let nom =
            this.state.name !== '' ?
                this.state.name : (this.setState({ errorNom: true }), null)

        let photoName =
            this.state.filename !=='err' ?
                this.state.filename : null

        let description =
            this.state.description

        let categorie =
            this.state.categorie

        let bio =
            this.state.check

        let restaurant =
            this.props.restaurant
        
        let prixBase = //aun hay que poner el input
            this.state.prixBase

        let data = {
            nom,
            description,
            photoName,
            categorie,
            restaurant,
            bio,
            prixBase
        }

        let oknom = nom !== null ? true : (toast.error('Le nom est vide'), false)
        let okphotoName = photoName !== null ? true : (toast.error('upload photo fail'), false)

        let ok = oknom & okphotoName?
            (
                toast.success('👍 le produit a été créé avec succès !', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                }),
                console.log(data),
                this.props.back(),
                true
            ) : (
                toast.warn(`la produit n'a pas été crée, verifier les champ SVP`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                }),
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

    updateCkeck = (evt) => {
        this.setState({ check: !this.state.check });
    }

    updateOptionCategorie = (evt) => {
        this.setState({
            categorie: evt.target.value
        });
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-1 col-md-10">
                        <div >
                            <legend>Restaurant: {this.props.restaurant}</legend>
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
                                <ListOption
                                    label='Categorie'
                                    categories=':4000/categorie'
                                    into={this.state.categorie}
                                    default='sans categorie'
                                    back={this.updateOptionCategorie}>
                                </ListOption>
                                <CheckBox
                                    label='Bio?'
                                    back={this.updateCkeck}
                                    into={this.state.check}>
                                </CheckBox>
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

