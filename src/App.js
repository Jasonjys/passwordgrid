import React, { Component } from 'react';
import './App.css';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Grid from './components/Grid'
import FlagsContainer from './components/FlagsContainer'

class App extends Component {
  render() {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <FlagsContainer />
        <Grid flagPosition={this.props.flagPosition} />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);
