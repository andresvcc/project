import React, { Component } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import ButtonCategorieAdd from '../buttons/buttonCategorieAdd'

export default class ListOption extends Component {
    state = {
        values: [],
        page:<p>void</p>
    }

    componentDidMount() {
        this.update()
    }

    page=(values)=>{
        return(
            <div className="">
                <p></p>
                <div className="form-group input-group-prepend" >
                <label className="input-group-text">{this.props.label}:</label>
                    <div className="drop-down">
                        <select 
                            className="custom-select" 
                            onChange={this.props.back}>
                        {
                            values.map((obj) => {
                                return <option key ={obj.id} value={obj.id}>{obj.name}</option>
                            })
                        }</select>
                    </div>
                </div>
                {this.buttonAjouter(this.props.ajouter)}
            </div>
        )
    }

    update = ()=>{
        axios.post(`http://localhost${this.props.categories}`)
        .then(res => {
            const values = res.data;
            this.setState({page:this.page(values)});
        })
    }

    buttonAjouter = (e)=>{
        let res = e ? (
            <ButtonCategorieAdd action={this.update}/>
        ):(
            ''
        )
        return res
    }

    render() {
        return (
            this.state.page
        );
    }
   
}
