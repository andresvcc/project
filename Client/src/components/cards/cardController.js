import React, { Component } from 'react';
//import axios from 'axios';
import Noms from './noms.js';

export default class CardController extends Component {

    render() {
        return (
            <div >
                <Noms 
                    values={this.props.values} 
                    eliminer={this.props.eliminer}
                    voir = {this.props.voir}
                ></Noms>
            </div>
        )
    }
}