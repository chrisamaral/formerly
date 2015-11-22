import {PropTypes} from 'react'

export default {
  propTypes: {
    children: PropTypes.node,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  },
  childContextTypes: {
    getValue: PropTypes.func.isRequired
  },
  contextTypes: {
    getAbsoluteName: PropTypes.func.isRequired,
    triggerChange: PropTypes.func.isRequired
  },
  getChildContext () {
    return {
      getValue: () => this.refs.recur._RECUR_
    }
  },
  getInitialState () {
    return {
      value: this.props.value || this.props.defaultValue
    }
  },
  componentDidMount () {
    this.subscribers = []
    this.refs.recur._subscribeTo = fn => {
      this.subscribers.push(fn)
      setTimeout(() => fn(this.refs.recur._RECUR_), 100)
    }
    this.expose()
  },
  componentDidUpdate () {
    this.expose()
  },
  componentWillReceiveProps ({value}) {
    const stateValue = this.state.value
    const propsValue = this.props.value || this.props.defaultValue

    if (stateValue === propsValue && propsValue !== value) {
      this.setState({value})
    }
  },
  expose () {
    let {value} = this.state
    const el = this.refs.recur
    const isInput = el.tagName.toLowerCase() === 'input'

    if (value === undefined && isInput && el.type === 'checkbox') {
      value = false
    }

    el._RECUR_ = value
    this.context.triggerChange(el.name, value)
  },
  onChange ({target}) {
    this.setState({value: this.readValue(target)})
  }
}
