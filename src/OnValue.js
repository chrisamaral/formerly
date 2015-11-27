const {cloneElement, DOM, Children, createClass, PropTypes} = require('react')
const {div} = DOM
module.exports = createClass({
  displayName: 'OnValue',
  propTypes: {
    children: PropTypes.node.isRequired,
    in: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]).isRequired,
    test: PropTypes.func
  },
  contextTypes: {
    subscribeTo: PropTypes.func.isRequired
  },
  getInitialState () {
    return {}
  },
  componentDidMount () {
    this.references().forEach(name =>
      this.context.subscribeTo(name, value => {
        if (!this.isMounted() || value === undefined) return
        this.setState({[name]: value})
      }))
  },
  references () {
    const {props} = this
    return Array.isArray(props.in) ? props.in : [props.in]
  },
  render () {
    const {children, test} = this.props
    const {state} = this

    if (!Object.keys(state).length) return null
    if (test && !test(state)) return null

    return div(null, Children.map(children,
      child => cloneElement(child, state)))
  }
})
