import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default class TextFormLine extends Component {
    state = {
        values: []
    }
    messageError = () =>{
        return this.props.msgerror ? this.props.msgerror : 
                    `le champ  ${this.props.label} est obligatoire, accepte uniquement les chiffres`
    }

    errorMsg = (v) => {
        return v ? 
            <h6 style={{ color:'red'}}>{this.messageError()}</h6> :
            ''
    }

    errorBorder = (v) => {
        return v ?
            '2px solid red' :
            ''
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
                        onChange={this.props.back}
                        required
                        style={{ border: this.errorBorder(this.props.error) }}>
                    </input>        
                    </div>
                </div>
                {this.errorMsg(this.props.error)}
            </div>
        );
    }
}
