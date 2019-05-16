import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import CardBoxProduitResume from './cardBoxProduitResume'

class CardListProduitResume extends Component {

    state={
        produits:[]
    }

    componentWillMount(){
        let data = {
            id: this.props.sessID,
            idAchat:this.props.id
          }
          axios.post(`http://localhost:4000/numAchatList`, data )
          .then(res => {
              let ok = res.data.ok ? (
                  this.setState({produits:res.data.response}),
                  this.props.total(res.data.response),
                  true 
              ):(
                  false
              )
              ok ?   console.log('RESUME ACHAT ok') : console.log('RESUME ACHAT problem')
          })
          .catch(err => { // then print response status
              console.log(err)
          })
    }




    render(){
        var values = this.state.produits.map((value, i) => {

        
            return (
                <div className ='' key={i} >
                    <CardBoxProduitResume
                        title={value.nom}
                        bio={value.bio}
                        prixBase={value.prix_base}
                        photoName={value.photoName}
                        quantite={value.quantite}
                        prixTotal={value.prixTotal}
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
      sessID: state.counter.sessID,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
  
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(CardListProduitResume)

