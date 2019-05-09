import React, { Component } from 'react';
import CardBoxRestaurant from './cardBoxRestaurant'
import ScreenEditRestaurant from '../fullScreen/screenEditRestaurant'
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

export default class CardListRestaurant extends Component {
    render(){
        var values = this.props.values.map((value, i) => {
        
            let onEliminerClick = ()=>{
                console.log('delRestaurant', value)
                this.props.eliminer(value.nom, value.photoName)
            }
        
            return (
                <div className ='col-ms-9' key={i} style={{width:'450px', height:'510px', paddingTop:'40px', paddingLeft:'20px'}}>
                    <CardBoxRestaurant
                        title={value.nom}
                        description={value.description}
                        adresse={value.adresse}
                        tel={value.telephone}
                        quartier={value.quartier}
                        photoName={value.photoName}
                        eliminerCLick={onEliminerClick}
                    />
                    <div className="form-row" style={{marginTop:'-48px', paddingLeft:'120px'}}>
                        <div className="col-md-5">

                        </div>
                        <div className="col-md-3">
                            <ScreenEditRestaurant
                                title={value.nom}
                                description={value.description}
                                adresse={value.adresse}
                                tel={value.telephone}
                                quartier={value.quartier}
                                photoName={value.photoName}
                            />
                        </div>
                        <div className="col-md-3">
                            <Button color='secondary' size="small" onClick={onEliminerClick}>
                                <DeleteIcon color='error'/>
                            </Button>
                        </div>
                    </div>



                </div>           
            )
        })
        
        return (
            <div className={'form-inline form-group '}>
                    {values}
            </div>
        )
    }
}