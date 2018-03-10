import React, { Component } from 'react';

class Square extends Component {
  render() {
    return (
      <div style={{
        backgroundColor: 'grey',
        width: '100%',
        height: '100%',
        borderStyle: 'solid',
        borderColor: 'red'
      }}>
        {this.props.children}
      </div>
    );
  }
}

export default Square;