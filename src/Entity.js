const TreeNodeMixin = require('./TreeNodeMixin')
const {createClass, DOM, PropTypes} = require('react')

const {div} = DOM

module.exports = createClass({
  mixins: [TreeNodeMixin],
  displayName: 'Entity',
  contextTypes: {
    getAbsoluteName: PropTypes.func.isRequired,
    waitForError: PropTypes.func.isRequired,
    waitForValue: PropTypes.func.isRequired
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
