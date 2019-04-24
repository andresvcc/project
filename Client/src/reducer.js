const initialState = {
    value: 0,
    page:'null'
  };
  
  function addReducer(state = initialState, action) {
    switch (action.type) {
      case "INCREMENT":
        return { ...state, value: state.value + 1};
      case "DECREASE":
        return { ...state, page:'null', value: state.value - 1};
      case "FORM_PRODUIT":
        return { ...state, page: 'produit'};
      case "FORM_RESTAURANT":
        return { ...state, page: 'restaurant'};
      case "FORM_CATEGORIE":
        return { ...state, page: 'categorie'};
      default:
        return state;
    }
  }
  
  export default addReducer;
  