import "./space.styl"

import React, {Component, PropTypes} from "react"
import {Link} from "react-router"
import data from "resources/data"

class Space extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // Updates often enough to give the effect of players joining.
      playersCount: Math.floor(Math.random() * 100),
      space: props.space
    }
  }

  getAccentColor() {
    const {id, title} = this.state.space
    // Generates a good range of predictable colors within the gamut.
    const rotation = title.length * (parseInt(id, 10) * 5 + 4) % 360

    return `hsl(${rotation}, 100%, 75%)`
  }

  handleChange({target}) {
    const {space} = this.state

    space[target.dataset.property] = target.checked

    this.setState({space})

    data.Space
      .updateById(parseInt(space.id, 10), space)
  }

  render() {
    const {playersCount, space} = this.state
    const accentColor = this.getAccentColor()

    const style = {
      backgroundImage: `url(${space.image})`,
      borderColor: accentColor
    }

    const id = prefix => `${prefix}-${space.id}`

    return <section data-component="space" style={style}>
      <section className="header" style={{backgroundColor: accentColor}}>
        <div className="title" data-selectable>
          {space.title}
        </div>

        <div className="details" data-selectable>
          {`${space.user.first_name} ${space.user.last_name}`}
        </div>
      </section>

      <section className="content">
        <div className="description" data-selectable>
          {space.description}
        </div>

        <div className="stats">
          <span className="stat">{`Players: ${playersCount}`}</span>
        </div>
      </section>

      <section className="actions">
        <div className="fields">
          <div className="field-group" data-group-type="checkbox">
            <input
              checked={space.welcome}
              className="field"
              data-property="welcome"
              id={id("welcome")}
              onChange={this.handleChange.bind(this)}
              type="checkbox" />
            <label htmlFor={id("welcome")}>Welcome</label>
          </div>

          <div className="field-group" data-group-type="checkbox">
            <input
              checked={space.private}
              className="field"
              data-property="private"
              id={id("private")}
              onChange={this.handleChange.bind(this)}
              type="checkbox" />
            <label htmlFor={id("private")}>Private</label>
          </div>

          <div className="field-group" data-group-type="checkbox">
            <input
              checked={space.featured}
              className="field"
              data-property="featured"
              id={id("featured")}
              onChange={this.handleChange.bind(this)}
              type="checkbox" />
            <label htmlFor={id("featured")}>Featured</label>
          </div>
        </div>

        <Link className="action" data-actionable style={{backgroundColor: accentColor}} to={`/edit/${space.id}`}>
          Edit
        </Link>
      </section>
    </section>
  }
}

Space.propTypes = {
  space: PropTypes.object.isRequired
}

export default Space
