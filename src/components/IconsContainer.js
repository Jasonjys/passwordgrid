import React, { Component } from 'react'
import pluralize from 'pluralize'
import Icon from './Icon'

class IconsContainer extends Component {
  render () {
    const { icons, category } = this.props
    return (
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 10}}>
          {`${pluralize.plural(category)}:`}
        </div>
        {icons.map((icon, i) => (
          <Icon
            dropped={false}
            key={icon.id}
            index={i}
            id={icon.id}
            icon={icon.icon}
            height={60}
            width={60}
            category={icon.category}
            moveIcon={this.props.moveIcon}
            selectIcon={this.props.selectIcon}
          />
        ))}
      </div>
    )
  }
}

export default IconsContainer