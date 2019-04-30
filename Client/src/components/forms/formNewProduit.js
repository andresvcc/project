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
import NumForm from './textFormLine';
import CheckBox from './checkBox'

class FormNewProduit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0,
            filename: '',
            name: '',
            description: '',
            prixBase:'',
            bio:false,
            categorie:1,
            fileCharged: 'cliker ici pour charger une photo',
            errorNom: false,
            errorPrixBase: false
        }
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

    onTerminer = () => {
        let okname = this.state.name !== '' ? true : (
            toast.error('Le nom est vide'), 
            this.setState({ errorNom: true }),
            false
        )

        let okprixbase = this.state.prixBase !== '' ? true : (
            toast.error('le prix doit etre un nombre'), 
            this.setState({ errorPrixBase: true }),
            false
        )
        
        okname && okprixbase  ? this.uploadFile() : toast.warn(`Le produit n'a pas été crée, verifier les champ SVP`)
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

        let nom =
            this.state.name !== '' ?
                this.state.name : (this.setState({ errorNom: true }), '')

        let prixBase =
            this.state.prixBase !== ''  ?
                this.state.prixBase :  (this.setState({ errorPrixBase: true }), -1)

        let description =
            this.state.description

        let categorie =
            this.state.categorie
        
        let bio =
            this.state.bio

        let restaurant = 
            this.props.restaurant

        let id = this.props.sessID

        let photoName = this.state.filename

        let data = {
            id,
            nom,
            description,
            photoName,
            categorie,
            restaurant,
            bio,
            prixBase
        }
           
        this.newProduitQuery(data)
    }

    newProduitQuery = (data) =>{
        console.log('evoie', data)
        axios.post(`http://localhost:4000/newProduit`, data )
        .then(res => {
            console.log(res.data)
            let ok = res.data.ok ? (
                console.log('Produit ajouté avec success'), 
                this.props.action(),
                true 
            ):(
                this.setState({msgerrNom:res.data.msg}),
                toast.error(res.data.msg), 
                false
            )
            ok ?   this.props.back() : console.log('propduit ne pas ajouté')
        })
        .catch(err => { // then print response status
            toast.error('information incorrecte')
            console.log(err)
        })
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

    updateInputBio = (evt) => {
        this.setState({
            bio: !this.state.bio,
        });
    }

    updateInputPrixBase = (evt) => {
        this.setState({
            prixBase: evt.target.value,
            errorPrixBase: false
        });
    }

    updateOptionCategorie = (evt) => {
        this.setState({
            categorie: evt.target.value
        });
    }

    /*
    
        <div style={{ position: 'absolute' }}>
            <h6>nom:{this.state.name}</h6>
            <h6>description:{this.state.description}</h6>
            <h6>categorie:{this.state.categorie}</h6>
            <h6>prix:{this.state.prixBase}</h6>
            <h6>bio:{this.state.bio.toString()}</h6>
        </div>

    */

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="offset-sm-1 col-sm-10">
                        <div >
                            <legend>Ajouter un nouveau Produit</legend>
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
                                    back={this.updateInputDescription}
                                    >
                                </TextArea>
                                <div className="form-row">
                                        <div className="col">
                                            <ListOption
                                                label='Categorie'
                                                categories=':4000/listCategories'
                                                into={this.state.categorie}
                                                back={this.updateOptionCategorie}
                                                >
                                            </ListOption>
                                        </div>
                                        <div className="col">
                                            <NumForm
                                                label='Prix'
                                                into= {0}
                                                error={this.state.errorPrixBase}
                                                back={this.updateInputPrixBase}
                                                >
                                            </NumForm>
                                        </div>
                                    </div>
                                <div>
                                    <CheckBox
                                        label = 'Bio?'
                                        into = {this.state.bio}
                                        back = {this.updateInputBio}
                                        >
                                    </CheckBox>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(FormNewProduit)
