import {cloneElement, DOM, Children, createClass, PropTypes} from 'react'
const {div} = DOM
export default createClass({
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
    subscribeToError: PropTypes.func.isRequired
  },
  getInitialState () {
    return {error: null}
  },
  componentDidMount () {
    const {props} = this
    this.context.subscribeToError(props.in, (error, value) => {
      if (!this.isMounted() || value === undefined) return
      this.setState({error, value})
    })
  },
  render () {
    const {props} = this
    const {error} = this.state
    const {children, type} = props

    if (!error) return null
    if (typeof type === 'string' && !error[type]) return null
    if (typeof type === 'function' && error.custom instanceof type === false) return null

    return div(null, Children.map(children,
      child => cloneElement(child, {error})))
  }
})
