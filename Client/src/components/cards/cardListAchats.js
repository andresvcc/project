import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios';
import CardBoxAchat from './cardBoxAchat'

class CardListAchats extends Component {

    state = {
        values: [],
    }

    componentDidMount() {
        this.achatListUpdate()
    }

    achatListUpdate = () =>{
        let data = {
          id: this.props.sessID
        }

        axios.post(`http://localhost:4000/listAchat`, data )
        .then(res => {
            console.log('liste des achats',res.data)
            res.data.ok ? this.setState({values:res.data.response}) : 
                console.log('probleme avec la requete pour acceder a la liste des achats')
        })
        .catch(err => { // then print response status
            console.log('error list des achat querry',err)
        })
    }
    
    payement=(value)=>{
       let res = value === 1 ? 'payement confirmé':'payement sans confirmer'
       return res
    }

    render(){
        var values = this.state.values.map((value, i) => {
            return (
                <div className ='' key={i} >
                    <CardBoxAchat 
                        id = {value.id_achat}
                        dateAchat = {value.date_achat} 
                        total = {value.total}
                    />
                </div>           
            )
        })
        
        return (
            <div>   
                    <h2>Liste des Achats</h2>
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

  export default connect(mapStateToProps, mapDispatchToProps)(CardListAchats)

