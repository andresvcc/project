import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ToasConfig from './toasConfig'

/* compossant */
import FormNewAcheteur from './formNewAcheteur';
import FormNewProduit from './formNewProduit';
import FormNewVendeur from './formNewVendeur';
import FormNewRestaurant from './formNewRestaurant';

export default class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
      
      }
  }
 
  componentDidMount() {

    
  }

  render() {
    return (
      <div>
        <ToasConfig></ToasConfig>
        <FormNewProduit></FormNewProduit>
      </div>
    
    )
  }
}


