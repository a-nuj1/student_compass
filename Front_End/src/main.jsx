import React from 'react'
import App from './App.jsx'
import { ChakraProvider, theme} from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react'
import {Provider as ReduxProvider} from 'react-redux'
import store from './redux/store.js'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ReduxProvider store = {store}>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <App />
    </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>,
)