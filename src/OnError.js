const {cloneElement, DOM, Children, createClass, PropTypes} = require('react')
const {div} = DOM

module.exports = createClass({
  displayName: 'OnError',
  propTypes: {
    children: PropTypes.node.isRequired,
    in: PropTypes.string.isRequired,
    type: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ])
  },
  contextTypes: {
    getAbsoluteName: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    getError: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired
  },
  componentDidMount () {
    this.unsubscribe = this.context.onError(this.getName(), () => this.forceUpdate())
  },
  componentWillUnmount () {
    this.unsubscribe()
  },
  getName () {
    return this.context.getAbsoluteName(this.props.in)
  },
  render () {
    const {props} = this

    const name = this.getName()
    const value = this.context.getValue(name)
    const error = this.context.getError(name)

    const {children, type} = props

    if (!error) return null
    if (typeof type === 'string' && !error[type]) return null
    if (typeof type === 'function' && error.custom instanceof type === false) return null

    return div(null, Children.map(children,
      child => cloneElement(child, {error, value})))
  }
})
