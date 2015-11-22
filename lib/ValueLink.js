import {cloneElement, DOM, Children, createClass, PropTypes} from 'react'
const {div} = DOM
export default createClass({
  displayName: 'ValueLink',
  propTypes: {
    children: PropTypes.node.isRequired
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
    const {to} = this.props
    return Array.isArray(to) ? to : [to]
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
