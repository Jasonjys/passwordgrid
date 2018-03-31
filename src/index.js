import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const rootEl = document.getElementById('root')

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, rootEl)

registerServiceWorker()
