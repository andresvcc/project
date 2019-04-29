import React, { Component } from 'react';
import CardBoxProduit from './cardBoxProduit'

export default class cardListProduit extends Component {
    render(){
        var values = this.props.values.map((value, i) => {
            let onVoirClick = ()=>{
                console.log('onVoirClick', i)
                this.props.voir(value.nom, value.photoName)
            }
        
            let onEliminerClick = ()=>{
                console.log('Click cardBoc', i)
                this.props.eliminer(value.nom, value.photoName)
            }
        
            return (
                <div className ='' key={i} style={{width:'40vw'}}>
                    <CardBoxProduit
                        title={value.nom}
                        description={value.description}
                        adresse={value.adresse}
                        tel={value.telephone}
                        quartier={value.quartier}
                        photoName={value.photoName}
                        voirClick ={onVoirClick}
                        eliminerCLick={onEliminerClick}
                    />
                </div>           
            )
        })
        
        return (
            <div className={'form-inline form-group '} style={{marginTop:'30px',marginLeft:'4%', marginRight:'auto'}}>
                    {values}
            </div>
        )
    }
}