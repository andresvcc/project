export const incrementCount = count => {
  const num = count+1
  return {
  type: 'INCREMENT_COUNT',
  count: num
  }
}

export const decrementCount = count => {
  const num = count - 1
  return {
    type: 'DECREMENT_COUNT',
    count: num
  }
}

export const login = dataUser => {
  console.log('Login reponse', dataUser)
  return {
    type: 'LOGIN',
    loginStatus: true,
    typeUser:dataUser.typeUser,
    surname:dataUser.surname,
    sessID:dataUser.sessID,
    incrireVisibility:'hidden'
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
    loginStatus: false,
    typeUser:0,
    surname:'inconue',
    sessID:'vide',
    incrireVisibility:'visible'
  }
}

function add(accumulator, a) {
  return accumulator + a;
}

export const updatePanier = panierList => {
  console.log('produits dans le panier', panierList)
  
  let total1 = panierList.map((value, i) => {
    return value.prixTotal
  })

  return {
    type: 'UPDATE_PANIER',
    produitPanier:panierList,
    panierTotal:total1.reduce(add,0)
  }
}