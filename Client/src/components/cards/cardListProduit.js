import React, { Component } from 'react';
import CardBoxProduit from './cardBoxProduit'

export default class cardListProduit extends Component {
    render(){
        var values = this.props.values.map((value, i) => {
                    
            let onEliminerClick = ()=>{
                this.props.eliminer(value.nom, value.photoName)
            }
        
            return (
                <div className ='' key={i}>
                    <CardBoxProduit
                        title={value.nom}
                        description={value.description}
                        bio={value.bio}
                        prixBase={value.prix_base}
                        categorie={value.categorie}
                        photoName={value.photoName}
                        eliminerCLick={onEliminerClick}
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