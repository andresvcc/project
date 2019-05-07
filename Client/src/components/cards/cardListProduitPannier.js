import React, { Component } from 'react';
import CardBoxProduitPannier from './cardBoxProduitPannier'

export default class CardListProduitPannier extends Component {
    render(){
        var values = this.props.values.map((value, i) => {
                    
            let onEliminer = ()=>{
                this.props.eliminer(value.nom)
            }
        
            return (
                <div className ='' key={i} >
                    <CardBoxProduitPannier
                        title={value.nom}
                        description={value.description}
                        bio={value.bio}
                        prixBase={value.prix_base}
                        categorie={value.categorie}
                        photoName={value.photoPlat}
                        eliminerCLick={onEliminer}
                    />
                </div>           
            )
        })
        
        return (
            <div>
                    {values}
            </div>
        )
    }
}