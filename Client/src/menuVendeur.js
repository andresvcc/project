import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as actions from "./actions";

class PageVendeur extends PureComponent {
  render() {
    const props = this.props;
    return (
      <div>
        <h1>{props.value}</h1>
        <h1>-{props.page}</h1>
        <button onClick={props.incrementAction}>increment</button>
        <button onClick={props.formProduit}>Produit</button>
        <button onClick={props.formRestaurant}>Restaurant</button>
        <button onClick={props.formCategorie}>Categorie</button>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  value: state.value,
  page: state.page
});

const mapDispatchToProps = dispatch => ({
  incrementAction: () => dispatch(actions.incrementAction()),
  formProduit:() => dispatch(actions.formProduit()),
  formRestaurant:()=>dispatch(actions.formRestaurant()),
  formCategorie: ()=>dispatch(actions.formCategorie())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageVendeur);
