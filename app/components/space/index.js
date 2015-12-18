import "./space.styl"

import React, {Component, PropTypes} from "react"
import {Link} from "react-router"

class Space extends Component {
  render() {
    const {props} = this

    return <section data-component="space">
      <section className="header">
        <div className="title">
          {`${props.title} created by ${props.user.first_name} ${props.user.last_name}`}
        </div>
      </section>

      <section className="content">
        <div className="description">
          {props.description}
        </div>

        <section className="actions">
          <Link className="action" to={`/edit/${props.id}`}>Edit</Link>
        </section>
      </section>
    </section>
  }
}

Space.propTypes = {
  created_by: PropTypes.number.isRequired, // eslint-disable-line camelcase
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
