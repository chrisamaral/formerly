const {createClass, DOM, PropTypes} = require('react')

const {div} = DOM

module.exports = createClass({
  displayName: 'Entity',
  contextTypes: {
    getAbsoluteName: PropTypes.func.isRequired
  },
  propTypes: {
    children: PropTypes.node.isRequired,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  },
  childContextTypes: {
    getAbsoluteName: PropTypes.func.isRequired
  },
  getChildContext () {
    return {
      getAbsoluteName: this.getAbsoluteName
    }
  },
  getAbsoluteName (path) {
    return this.context.getAbsoluteName(this.props.name +
      (path !== undefined ? '.' + path : ''))
  },
  render  () {
    return div({'data-name': this.context.getAbsoluteName(this.props.name), ref: 'mainElement'},
      this.props.children)
  }
})
