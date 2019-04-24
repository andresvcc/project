import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import * as actions from "../actions";
import FormNewProduit from "./forms/formNewProduit";
import FormNewRestaurant from './forms/formNewRestaurant';
import FormNewCategorie from './forms/formNewCategorie';




class SwitchFormVendeur extends PureComponent {
  fn = (page) => {
    switch (page) {
      case 'produit': return (<FormNewProduit back = {this.props.decreaseAction}/>)
      case 'restaurant': return (<FormNewRestaurant back = {this.props.decreaseAction}/>)
      case 'categorie': return (<FormNewCategorie back = {this.props.decreaseAction}/>)
      default:
        break;
    }
  }
  
  
  render() {
    const props = this.props;
    return (
      <div>
        {this.fn(props.page)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  page: state.page
});

const mapDispatchToProps = dispatch => ({
  decreaseAction: () => dispatch(actions.decreaseAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchFormVendeur);
