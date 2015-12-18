import "./space.styl"

import React, {Component, PropTypes} from "react"
import {Link} from "react-router"

class Space extends Component {
  getAccentColor() {
    const {id, title} = this.props
    // Generates a good range of predictable colors within the gamut.
    const rotation = title.length * (parseInt(id, 10) * 5 + 4) % 360

    return `hsl(${rotation}, 100%, 75%)`
  }

  render() {
    const {props} = this
    const accentColor = this.getAccentColor()

    const style = {
      backgroundImage: `url(${props.image})`,
      borderColor: accentColor
    }

    return <section data-component="space" style={style}>
      <section className="header" style={{backgroundColor: accentColor}}>
        <div className="title" data-selectable>
          {props.title}
        </div>

        <div className="details" data-selectable>
          {`${props.user.first_name} ${props.user.last_name}`}
        </div>
      </section>

      <section className="content">
        <div className="description" data-selectable>
          {props.description}
        </div>

        <div className="stats">
          <span className="stat">{`Players: ${Math.floor(Math.random() * 100)}`}</span>
        </div>
      </section>

      <section className="actions">
        <Link className="action" data-actionable style={{backgroundColor: accentColor}} to={`/edit/${props.id}`}>
          Edit
        </Link>
      </section>
    </section>
  }
}

Space.propTypes = {
  created_by: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  featured: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  members: PropTypes.array,
  private: PropTypes.bool.isRequired, // eslint-disable-line quote-props
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  welcome: PropTypes.bool.isRequired
}

export default Space
