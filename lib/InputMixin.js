import {PropTypes} from 'react'

export default {
  propTypes: {
    children: PropTypes.node,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    onChange: PropTypes.func
  },
  childContextTypes: {
    getValue: PropTypes.func.isRequired
  },
  contextTypes: {
    getAbsoluteName: PropTypes.func.isRequired
  },
  getChildContext () {
    return {
      getValue: () => this.state.value
    }
  },
  getInitialState () {
    return {
      value: this.props.value || this.props.defaultValue
    }
  },
  componentDidMount () {
    this.expose()
  },
  componentDidUpdate () {
    this.expose()
  },
  componentWillReceiveProps ({value}) {
    const stateValue = this.state.value
    const propsValue = this.props.value || this.props.defaultValue

    if (stateValue === propsValue && propsValue !== value) {
      this.setValue(value)
    }
  },
  setValue (value) {
    const {onChange} = this.props
    this.setState({value}, onChange ? () => onChange(value) : undefined)
  },
  expose () {
    let {value} = this.state
    const el = this.refs.recur
    const isInput = el.tagName.toLowerCase() === 'input'

    if (value === undefined && isInput && el.type === 'checkbox') {
      value = false
    }

    el._RECUR_ = value
  },
  onChange ({target}) {
    this.setValue(this.readValue(target))
  }
}
