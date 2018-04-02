import React, { Component } from 'react'
import pluralize from 'pluralize'
import Icon from './Icon'

class IconsContainer extends Component {
  render () {
    const { icons, category } = this.props
    return (
      <div style={{display: 'flex', width: '100%'}}>
        <div style={{display: 'flex', width: '10%', alignItems: 'center', justifyContent: 'center'}}>
          {`${pluralize.plural(category)}:`}
        </div>
        <div style={{display: 'flex', width: '90%', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
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
      </div>
    )
  }
}

export default IconsContainer