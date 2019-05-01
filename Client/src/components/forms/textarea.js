import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default class TextArea extends Component {
    state = {
        values: []
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
                    <label htmlFor="comment">{this.props.label}:</label>
                    <textarea 
                        className="form-control" 
                        rows="5" 
                        id="comment"
                        placeholder={this.props.into}
                        onChange={this.props.back}
                        style={{ border: this.errorBorder(this.props.error)}}>
                    </textarea>
                </div>
            </div>

        );
    }

}