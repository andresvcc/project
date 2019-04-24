import * as action from "./actionTypes";

export function incrementAction() {
  return function(dispatch) {
    dispatch({
      type: action.INCREMENT
    });
  };
}

export function decreaseAction() {
  return function(dispatch) {
    dispatch({
      type: action.DECREASE
    });
  };
}

export function formProduit() {
  return function(dispatch) {
    dispatch({
      type: action.FORM_PRODUIT
    });
  };
}

export function formRestaurant() {
  return function(dispatch) {
    dispatch({
      type: action.FORM_RESTAURANT
    });
  };
}

export function formCategorie() {
  return function(dispatch) {
    dispatch({
      type: action.FORM_CATEGORIE
    });
  };
}