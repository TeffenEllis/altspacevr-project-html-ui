import "./spaces.styl"

import Space from "components/space"
import React, {Component} from "react"
import {Link} from "react-router"
import data from "resources/data"

class Spaces extends Component {
  constructor(props) {
    super(props)

    this.state = {
      spaces: [],
      users: []
    }
  }

  componentDidMount() {
    data.Space
      .getAll()
      .then(spaces => this.setState({spaces}))

    data.User
      .getAll()
      .then(users => this.setState({users}))
  }

  render() {
    const {spaces, users} = this.state

    return <section data-component="spaces">
      <h1>Altspace Spaces Admin</h1>

      {users.length && spaces.length ? spaces.map(this.renderSpace.bind(this)) : null}

      <div className="actions">
        <Link className="action" to="/new">Create</Link>
      </div>
    </section>
  }

  renderSpace(props) {
    const user = this.state.users.find(user => user.id === props.created_by)

    return <Space {...props} key={props.id} user={user} />
  }
}

export default Spaces
