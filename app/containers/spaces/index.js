import "./spaces.styl"

import Space from "components/space"
import React, {Component} from "react"
import {Link} from "react-router"
import data from "resources/data"

class Spaces extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: "",
      spaces: []
    }
  }

  componentDidMount() {
    const {Space, User} = data

    Space.getAll().then(spaces => {
      User.getAll().then(users => {
        spaces = spaces.map(space => {
          return Object.assign(space, {
            user: users.find(({id}) => id === space.created_by)
          })
        })

        this.setState({spaces})
      })
    })
  }

  queryChange({target: {value}}) {
    this.setState({query: value})
  }

  render() {
    const {query} = this.state
    const pattern = new RegExp(query, "i")
    let {spaces} = this.state

    function matchedQuery({title, user: {first_name, last_name}}) {
      return [title, `${first_name} ${last_name}`].some(criteria => criteria.search(pattern) !== -1)
    }

    if (query.length > 0) spaces = spaces.filter(matchedQuery)

    return <section data-component="spaces">
      <h1>Altspace Spaces Admin</h1>

      <section className="field-group search">
        <input
          className="field"
          onChange={this.queryChange.bind(this)}
          placeholder="Search by name or creator."
          type="text"
          value={query} />

        <div className="actions">
          <Link className="action" to="/new">Create</Link>
        </div>
      </section>


      {spaces.length ? spaces.map(space => <Space key={space.id} space={space} />) : this.renderPlaceholder()}
    </section>
  }

  renderPlaceholder() {
    return <div className="space-placeholder" data-component="space">
      <section className="header">
        {`No results for "${this.state.query}".`}
      </section>
    </div>
  }
}

export default Spaces
