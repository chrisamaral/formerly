import TreeNodeMixin from './TreeNodeMixin'
import {createClass, DOM, PropTypes} from 'react'

const {div} = DOM;

export default createClass({
  mixins: [TreeNodeMixin],
  displayName: 'Entity',
  contextTypes: {
    getName: PropTypes.func.isRequired
  },
  propTypes: {
    children: PropTypes.node.isRequired,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  },
  render  () {
    return div({'data-name': this.context.getName(this.id, this.props.name)},
      this.props.children)
  }
})
