import React, { Component } from 'react';
import CardBoxProduitExpo from './cardBoxProduitExpo'

export default class CardListProduitExpo extends Component {
    render(){
        var values = this.props.values.map((value, i) => {
                    
            let onEliminerClick = ()=>{
                this.props.eliminer(value.nom, value.photoName)
            }
        
            return (
                <div className ='' key={i} >
                    <CardBoxProduitExpo
                        title={value.nom}
                        description={value.description}
                        bio={value.bio}
                        prixBase={value.prix_base}
                        categorie={value.categorie}
                        photoName={value.photoPlat}
                        eliminerCLick={onEliminerClick}
                        restaurants={value.restaurants}

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