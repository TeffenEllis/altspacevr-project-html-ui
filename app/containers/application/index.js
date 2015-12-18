import "./application.styl"

import Space from "components/space"
import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"

class Application extends Component {
  render() {
    return <section data-component="application">
      <h1>Altspace Spaces Admin</h1>

      {this.props.spaces.map(props => <Space {...props} key={props.id} />)}

      <div className="actions">
        <span className="action">Create</span>
      </div>
    </section>
  }
}

Application.propTypes = {
  spaces: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    spaces: state.spaces
  }
}

export default connect(mapStateToProps)(Application)
