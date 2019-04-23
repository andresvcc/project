import React, { Component } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export default class ListOption extends Component {
    state = {
        values: []
    }

    componentDidMount() {
        axios.get(`http://localhost${this.props.categories}`)
            .then(res => {
                const values = res.data;
                this.setState({values});
            })
    }

    render() {
        return (
            <div className="">
                <p></p>
                <div className="form-group input-group-prepend" >
                <label className="input-group-text">{this.props.label}:</label>
                    <div className="drop-down">
                        <select 
                            className="custom-select" 
                            onChange={this.props.back}
                            value={this.props.into}>
                        <option value={0}>{this.props.default}</option>{
                            this.state.values.map((obj) => {
                                return <option key ={obj.id} value={obj.id}>{obj.name}</option>
                            })
                        }</select>
                    </div>
                </div>
            </div>
        );
    }
   
}
