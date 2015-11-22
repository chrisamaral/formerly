import TreeNodeMixin from './TreeNodeMixin'
import {createClass, DOM, PropTypes} from 'react'

const {div} = DOM

export default createClass({
  mixins: [TreeNodeMixin],
  displayName: 'Entity',
  contextTypes: {
    getAbsoluteName: PropTypes.func.isRequired,
    listenTo: PropTypes.func.isRequired
  },
  propTypes: {
    children: PropTypes.node.isRequired,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  },
  render  () {
    return div({'data-name': this.context.getAbsoluteName(this.props.name), ref: 'recur'},
      this.props.children)
  }
})
