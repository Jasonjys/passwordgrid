import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import registerServiceWorker from './registerServiceWorker'
import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyC47lRbubYO40J7JnfJcofcx6uy3nUyRCM',
  authDomain: 'passwordgrid.firebaseapp.com',
  databaseURL: 'https://passwordgrid.firebaseio.com',
  projectId: 'passwordgrid',
  storageBucket: '',
  messagingSenderId: '778539195766'
})

const rootEl = document.getElementById('root')

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, rootEl)

registerServiceWorker()
export const firestore = firebase.firestore()
