import React, { Component } from 'react'
import pluralize from 'pluralize'
import Icon from './Icon'

class IconsContainer extends Component {
  render () {
    const { icons, category } = this.props
    return (
      <div style={{minHeight: '16%'}}>
        <div style={{marginLeft: 15, marginTop: 10}}>
          {pluralize.plural(category)}
        </div>
        <div style={{display: 'flex', width: '100%', justifyContent: 'space-around', flexWrap: 'wrap'}}>
          {icons.map((icon, i) => (
            <Icon
              dropped={false}
              key={icon.id}
              index={i}
              id={icon.id}
              icon={icon.icon}
              height={80}
              width={80}
              category={icon.category}
              moveIcon={this.props.moveIcon}
              selectIcon={this.props.selectIcon}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default IconsContainer
