import React, { Component } from 'react';
import { ItemTypes } from './ItemTypes';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props) {
    moveFlag(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Square extends Component {
  render() {
    const { connectDropTarget, isOver } = this.props;

    connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'grey',
        borderStyle: 'solid',
        borderColor: 'red'
      }}>
        <div>
          {this.props.children}
        </div>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow'
          }} />
        }
      </div>
    )
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