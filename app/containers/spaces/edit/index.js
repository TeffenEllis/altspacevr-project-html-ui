import "./edit.styl"

import React, {Component, PropTypes} from "react"
import data from "resources/data"
import {Link} from "react-router"

class SpacesEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    if (props.params.id) {
      Object.assign(this.state, {
        status: "fetching",
        space: {}
      })
    }
    else {
      Object.assign(this.state, {
        status: "ready",
        space: {}
      })
    }
  }

  componentDidMount() {
    if (this.state.status !== "fetching") return

    let space = {}
    const members = []
    const onComplete = () => this.setState({
      space: Object.assign(space, {members}),
      status: "ready"
    })

    data.Space.getById(parseInt(this.props.params.id, 10))
      .then(nextSpace => {
        space = nextSpace

        if (!space.members || space.members.length === 0) return onComplete()

        space.members.forEach(id => {
          data.User
            .getById(parseInt(id, 10))
            .then(user => {
              members.push(user)

              if (members.length === space.members.length) onComplete()
            })
        })
      })
  }

  confirmSpaceDeletion() {
    if (!confirm(`Are you sure you want to delete the "${this.state.space.title}" space?`)) return

    data.Space
      .deleteById(parseInt(this.state.space.id, 10))
      .then(() => this.props.history.replaceState(null, "/"))
  }

  decoratedTitle() {
    const base = "Altspace Spaces Admin"
    const appended = this.state.space.id ? ` - ${this.state.space.title}` : ""

    return base + appended
  }

  render() {
    const {space, status} = this.state

    if (status !== "ready") {
      return <section data-component="spaces-edit">Loading</section>
    }

    return <section data-component="spaces-edit">
      <h1>{this.decoratedTitle()}</h1>

      <section className="fields">
        <div className="field-group">
          <label className="label" htmlFor="title">Title:</label>
          <input
            autoFocus
            className="field"
            id="title"
            placeholder="Something memorable."
            value={space.title} />
        </div>

        <div className="field-group">
          <label className="label" htmlFor="description">Description:</label>
          <textarea
            className="field"
            id="description"
            placeholder="What makes this space unlike others?"
            value={space.description}>
            </textarea>
        </div>

        <div className="field-group" data-group-type="checkbox">
          <input checked={space.welcome} id="welcome" type="checkbox" />
          <label htmlFor="welcome">Welcome space</label>
        </div>

        <div className="field-group" data-group-type="checkbox">
          <input checked={space.private} id="private" type="checkbox" />
          <label htmlFor="private">Private space</label>
        </div>

        <div className="field-group" data-group-type="checkbox">
          <input checked={space.featured} id="featured" type="checkbox" />
          <label htmlFor="featured">Featured space</label>
        </div>

        <div className="field-group">
          <label className="label" htmlFor="members">Members:</label>
        </div>
      </section>

      <section className="actions">
        <span className="action" onClick={this.confirmSpaceDeletion.bind(this)}>Delete</span>
        <Link className="action" to={"/"}>Cancel</Link>
        <span className="action">Save</span>
      </section>
    </section>
  }
}

SpacesEdit.propTypes = {
  history: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}

export default SpacesEdit
