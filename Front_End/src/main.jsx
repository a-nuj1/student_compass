import React from 'react'
import App from './App.jsx'
import { ChakraProvider, theme} from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react'


const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)