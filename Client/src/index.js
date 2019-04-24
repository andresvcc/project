import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import SwitchFormVendeur from './components/swithFormVendeur'
import MenuVendeur from './menuVendeur'
import MenuAppBar from './components/bar/MenuAppBar'
import TypographyMenu from './components/bar/SimpleTabs'
import store from './store'

import * as serviceWorker from './serviceWorker';


render(
  <Provider store={store}>
    <MenuAppBar></MenuAppBar>
    <MenuVendeur/>
    <TypographyMenu></TypographyMenu>
    
    <SwitchFormVendeur></SwitchFormVendeur>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
