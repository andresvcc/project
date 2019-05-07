import React, {Component} from 'react'
import {connect} from 'react-redux'
import CardBoxProduitPannier from './cardBoxProduitPannier'

class CardListProduitPannier extends Component {
    render(){
        var values = this.props.produitPanier.map((value, i) => {

        
            return (
                <div className ='' key={i} >
                    <CardBoxProduitPannier
                        title={value.nom}
                        description={value.description}
                        bio={value.bio}
                        prixBase={value.prix_base}
                        categorie={value.categorie}
                        photoName={value.photoName}
                        quantite={value.quantite}
                        prixTotal={value.prixTotal}
                        restaurant={value.restaurant}
                        all={value}
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


const mapStateToProps = (state) => {

    return {
      count: state.counter.count,
      loginStatus: state.counter.loginStatus,
      typeUser: state.counter.typeUser,
      surname: state.counter.surname,
      sessID: state.counter.sessID,
      produitPanier: state.counter.produitPanier,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
  
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(CardListProduitPannier)

