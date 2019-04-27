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
                <div className ='' key={i} style={{width:'380px'}}>
                    <CardBox
                        title={value.nom}
                        description={value.description}
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
            <div className={'form-inline form-group '} style={{marginLeft:'4%', marginRight:'auto'}}>
                    {values}
            </div>
        )
    }
}