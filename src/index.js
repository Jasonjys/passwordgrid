import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { observe } from './components/Drag';
import registerServiceWorker from './registerServiceWorker'

const rootEl = document.getElementById('root');

observe(knightPosition =>
  ReactDOM.render(
    <App flagPosition={flagPosition}/>,
    rootEl
  )
);

//ReactDOM.render(<App />, rootEl)
registerServiceWorker()
