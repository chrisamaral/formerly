import TreeNodeMixin from './TreeNodeMixin'
import {createClass, PropTypes} from 'react'

export default createClass({
  mixins: [TreeNodeMixin],
  displayName: 'Entity',
  contextTypes: {
    getName: PropTypes.func.isRequired,
    dropInput: PropTypes.func.isRequired
  },
  propTypes: {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired
  },
  componentWillUnmount () {
    if (!this.props.name) this.context.dropInput()
  },
  render  () {
    return this.props.children
  }
})
