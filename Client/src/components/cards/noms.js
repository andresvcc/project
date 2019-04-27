import React, { Component } from 'react';
import CardBox from './cardBox'

export default class Noms extends Component {
    render(){
        var values = this.props.values.map((value, i) => {
            let onVoirClick = ()=>{
                console.log('onVoirClick', i)
            }
        
            let onEliminerClick = ()=>{
                console.log('onEliminerClick', i)
            }
        
            return (
                <div key={i}>
                    <p >
                        id:{value.id_restaurant}-
                        nom:{value.nom}-
                        description:{value.description}-
                        tel:{value.telephone}-
                        quartier:{value.quartier}-
                        photoName:{value.photoName}
                    </p>
                    <CardBox
                        title={value.nom}
                        description={value.description}
                        photoName={value.photoName}
                        voirClick ={onVoirClick}
                        eliminerCLick={onEliminerClick}
                    />
                </div>

            
            )
        })
        return (
            <div >
                    {values}
            </div>
        )
    }
}