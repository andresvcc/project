import React, { Component } from 'react';
//import axios from 'axios';
import Noms from './noms.js';

export default class List extends Component {

    render() {
        return (
            <div >
                <Noms values={this.props.values}></Noms>
            </div>
        )
    }
}