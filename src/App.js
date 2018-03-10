import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid'
import FlagsContainer from './components/FlagsContainer'

class App extends Component {
  render() {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <FlagsContainer />
        <Grid />
      </div>
    )
  }
}

export default App;
