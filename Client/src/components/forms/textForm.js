import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default class TextForm extends Component {
    state = {
        values: [],
    }

    errorMsg = (v) => {
        return v ? 
            <h6 style={{ color:'red'}}>le champ {this.props.label} est obligatoire</h6> :
            ''
    }

    errorBorder = (v)=>{
        return v ?
            '2px solid red' :
            ''
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="usr">{this.props.label}:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder={this.props.into}
                        onChange={this.props.back}
                        required
                        style={{ border: this.errorBorder(this.props.error)}}>
                    </input>
                </div>
                {this.errorMsg(this.props.error)}
            </div>
        );
    }
}