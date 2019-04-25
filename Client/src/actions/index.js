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

export const login = typeUser => {
  return {
    type: 'LOGIN',
    loginStatus: true,
    typeUser:typeUser,
    incrireVisibility:'hidden'
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
    loginStatus: false,
    typeUser:0,
    incrireVisibility:'visible'
  }
}