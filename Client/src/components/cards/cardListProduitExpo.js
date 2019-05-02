import React, { Component } from 'react';
import CardBoxProduitExpo from './cardBoxProduitExpo'

export default class CardListProduitExpo extends Component {
    render(){
        var values = this.props.values.map((value, i) => {
                    
            let onAddShoppingCart = ()=>{
                this.props.shopping(value.nom, value.photoPlat, value.restaurants, value.photoResto)
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
                        addShoppingCart={onAddShoppingCart}
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