import React, { Component } from 'react';
import CardBoxRestaurant from './cardBoxRestaurant'

export default class CardListRestaurant extends Component {
    render(){
        var values = this.props.values.map((value, i) => {
        
            let onEliminerClick = ()=>{
                console.log('Click cardBoc', i)
                this.props.eliminer(value.nom, value.photoName)
            }
        
            return (
                <div className ='' key={i} style={{width:'400px', height:'450px'}}>
                    <CardBoxRestaurant
                        title={value.nom}
                        description={value.description}
                        adresse={value.adresse}
                        tel={value.telephone}
                        quartier={value.quartier}
                        photoName={value.photoName}
                        eliminerCLick={onEliminerClick}
                    />
                </div>           
            )
        })
        
        return (
            <div className={'form-inline form-group '} style={{marginTop:'30px', marginLeft:'50px', marginRight:'auto'}}>
                    {values}
            </div>
        )
    }
}