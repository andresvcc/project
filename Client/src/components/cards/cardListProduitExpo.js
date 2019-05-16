import React, { Component } from 'react';
import CardBoxProduitExpo from './cardBoxProduitExpo'

export default class CardListProduitExpo extends Component {
    render(){
        var values = this.props.values.map((value, i) => {
                    
            let onAddShoppingCart = (quantite)=>{
                this.props.shopping(value, quantite)
            }

            let onRecomendation = (valueRec, quantite)=>{
                this.props.shopping(valueRec, quantite)
            }
        
            return (
                <div className ='' key={i}>
                    <CardBoxProduitExpo
                        title={value.nom}
                        description={value.description}
                        bio={value.bio}
                        prixBase={value.prix_base}
                        categorie={value.categorie}
                        photoName={value.photoPlat}
                        addShoppingCart={onAddShoppingCart}
                        recomendation = {onRecomendation}
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