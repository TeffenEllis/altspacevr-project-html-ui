import "./edit.styl"

import React, {Component, PropTypes} from "react"
import data from "resources/data"
import {Link} from "react-router"

const DEFAULT_IMAGE_URL = "https://d3t5dfbyow1ax1.cloudfront.net/app/images/space-templates/exhibition-base-medium-560x315.jpg"

class SpacesEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      members: [],
      status: props.params.id ? "fetching" : "creating",
      space: {}
    }
  }

  componentDidMount() {
    if (this.state.status === "creating") {
      data.User
        .getAll()
        .then(members => {
          this.setState({
            members,
            space: {
              created_by: 1,
              description: "",
              featured: false,
              image: DEFAULT_IMAGE_URL,
              members: [],
              "private": false,
              title: "",
              welcome: false
            },
            status: "ready"
          })
        })

      return
    }

    data.Space.getById(parseInt(this.props.params.id, 10))
      .then(space => {
        // 404 handler, could be replaced by extending the data store with promise rejection.
        if (typeof space === "undefined") return this.props.history.replaceState(null, "/")

        data.User
          .getAll()
          .then(members => this.setState({
            members,
            space,
            status: "ready"
          }))
      })
  }

  confirmSpaceDeletion() {
    if (!confirm(`Are you sure you want to delete the "${this.state.space.title}" space?`)) return

    data.Space
      .deleteById(parseInt(this.state.space.id, 10))
      .then(() => this.props.history.replaceState(null, "/"))
  }

  decoratedTitle() {
    const appended = this.state.space.id ? ` - ${this.state.space.title}` : ""

    return "Altspace Spaces Admin" + appended
  }

  handleChange({target}) {
    const {space} = this.state
    let value

    switch (target.type) {
      case "checkbox":
        value = target.checked
        break
      case "select-multiple":
        value = Array.from(target.selectedOptions, option => option.value)
        break
      default:
        value = target.value
    }

    space[target.id] = value

    this.setState({space})
  }

  handleSave() {
    const onComplete = () => this.props.history.replaceState(null, "/")
    const {space} = this.state

    if (space.title.length === 0) return this.refs.title.focus()

    if (space.id) {
      return data.Space
        .updateById(parseInt(space.id, 10), space)
        .then(onComplete)
    }

    data.Space
      .create(space)
      .then(onComplete)
  }

  render() {
    const {members, space, status} = this.state

    if (status !== "ready") {
      return <section data-component="spaces-edit">Loading</section>
    }

    return <section data-component="spaces-edit">
      <section className="fields">
        <div className="field-group">
          <label className="label" htmlFor="title">Title:</label>
          <input
            autoFocus
            className="field"
            id="title"
            onChange={this.handleChange.bind(this)}
            placeholder="Something memorable."
            ref="title"
            value={space.title} />
        </div>

        <div className="field-group">
          <label className="label" htmlFor="description">Description:</label>
          <textarea
            className="field"
            id="description"
            onChange={this.handleChange.bind(this)}
            placeholder="What makes this space unlike others?"
            value={space.description}>
            </textarea>
        </div>

        <div className="field-group" data-group-type="checkbox">
          <input
            checked={space.welcome}
            className="field"
            id="welcome"
            onChange={this.handleChange.bind(this)}
            type="checkbox" />
          <label htmlFor="welcome">Welcome space</label>
        </div>

        <div className="field-group" data-group-type="checkbox">
          <input
            checked={space.private}
            className="field"
            id="private"
            onChange={this.handleChange.bind(this)}
            type="checkbox" />
          <label htmlFor="private">Private space</label>
        </div>

        <div className="field-group" data-group-type="checkbox">
          <input
            checked={space.featured}
            className="field"
            id="featured"
            onChange={this.handleChange.bind(this)}
            type="checkbox" />
          <label htmlFor="featured">Featured space</label>
        </div>

        <div className="field-group">
          <label className="label" htmlFor="members">Members:</label>
          <select className="field" id="members" multiple onChange={this.handleChange.bind(this)} value={space.members}>
            {members.map(({first_name, last_name, id}) => <option key={id} value={id}>
              {`${first_name} ${last_name}`}
            </option>)}
          </select>
        </div>
      </section>

      <section className="actions">
        <span className="action" data-actionable data-role="danger" onClick={this.confirmSpaceDeletion.bind(this)}>Delete</span>
        <Link className="action" data-actionable to={"/"}>Cancel</Link>
        <span className="action" data-actionable data-role="persist" onClick={this.handleSave.bind(this)}>Save</span>
      </section>
    </section>
  }
}

SpacesEdit.propTypes = {
  history: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}

export default SpacesEdit
