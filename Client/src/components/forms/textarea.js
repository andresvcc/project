import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default class TextArea extends Component {
    state = {
        values: []
    }

    componentDidMount() {

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
                        onChange={this.props.back}>
                    </textarea>
                </div>
            </div>

        );
    }

}