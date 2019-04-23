import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default class CheckBox extends Component {
    state = {
        values: []
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="form-group ">
                <div className="form-check">
                  <div >
                        <label className="form-check-label">
                            <input 
                                type="checkbox" 
                                className="form-check-input" 
                                onChange={this.props.back} 
                                defaultChecked = {this.props.into} />
                        {this.props.label}
                        </label>
                  </div>
                </div>
            </div>

        );
    }

}