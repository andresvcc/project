import React, { Component } from 'react';
import axios from 'axios';
import Noms from './noms.js';

export default class List extends Component {

        state = {
            values: []
        }


    componentWillMount = () => {
        axios.post(`http://localhost:4000/listRestaurants`)
        .then(res => {
            const values = res.data.resultat;
            console.log('cardController',values)
            this.setState({values:values});
        })
    }

    render() {
        return (
            <div>
                <Noms values={this.state.values}></Noms>
            </div>
        )
    }
}