import "./spaces.styl"

import Space from "components/space"
import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import data from "resources/data"
import {addSpaces} from "resources/action-creators/spaces"
import {addUsers} from "resources/action-creators/users"

class Spaces extends Component {
  componentDidMount() {
    data.Space
      .getAll()
      .then(spaces => this.props.onSpacesFetch(spaces))

    data.User
      .getAll()
      .then(users => this.props.onUsersFetch(users))
  }

  render() {
    const {spaces, users} = this.props

    return <section data-component="spaces">
      <h1>Altspace Spaces Admin</h1>

      {users.length && spaces.length ? this.props.spaces.map(this.renderSpace.bind(this)) : null}

      <div className="actions">
        <span className="action">Create</span>
      </div>
    </section>
  }

  renderSpace(props) {
    const user = this.props.users.find(user => user.id === props.created_by)

    return <Space {...props} key={props.id} user={user} />
  }
}

Spaces.propTypes = {
  onSpacesFetch: PropTypes.func.isRequired,
  onUsersFetch: PropTypes.func.isRequired,
  spaces: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    spaces: state.spaces,
    users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSpacesFetch: spaces => dispatch(addSpaces(spaces)),
    onUsersFetch: users => dispatch(addUsers(users))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spaces)
