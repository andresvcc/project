import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default class TextFormLine extends Component {
    state = {
        values: []
    }

    errorMsg = (v) => {
        return v ?
            <h6 style={{ color: 'red' }}>le champ {this.props.label} est obligatoire</h6> :
            ''
    }

    errorBorder = (v) => {
        return v ?
            '2px solid red' :
            ''
    }

    updateValue =(fn)=>{
        
    }

    render() {
        return (
            <div className="">
                <p></p>
                <div className="form-group input-group-prepend" >
                    <label className="input-group-text">{this.props.label}:</label>
                    <div className="drop-down">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder={this.props.into}
                        onChange={this.updateValue(this.props.back)}
                        required
                        style={{ border: this.errorBorder(this.props.error) }}>
                    </input>        
                    </div>
                    {this.errorMsg(this.props.error)}
                </div>
            </div>
        );
    }

}