import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//composants
import TextForm from './textForm';
import TextArea from './textarea';

export default class FormNewCategorie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            name: '',
            description: '',
            errorNom: false,
        }
    }

    onTerminer = () => {
        let ok = this.state.name !== '' ? (
                this.terminerSumit()
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

    terminerSumit = () => {
        /* ici on va mettre la requette pour ajouter un nouveau produit */
        let nom =
            this.state.name !== '' ?
                this.state.name : null

        let description =
            this.state.description
        
        let data = {
            nom,
            description,
        }
        
        let ok = data.nom ? (
            toast.success('la categorie a été ajouté avec success',{
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

    /*
    <h6>nom:{this.state.name}</h6>
    <h6>description:{this.state.description}</h6>

    */

    render() {
        return (
            <div className="container">
                    <div style={{ position: 'absolute' }}>
                    </div>
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
                                <button type="button" className="btn btn-success btn-block" onClick={this.onTerminer}>Terminer</button>
                                <button type="button" className="btn btn-link btn-block border" onClick={this.onAnuller}>Anuler</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

