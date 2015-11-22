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
    getName: PropTypes.func.isRequired
  },
  getChildContext () {
    return {
      getValue: () => this.state.value
    }
  },
  getInitialState () {
    return {
      value: this.props.value
    }
  },
  componentWillMount () {
    this.id = 'leaf-' + Math.random().toString(36).substr(2)
  },
  componentDidMount () {
    this.expose()
  },
  componentDidUpdate () {
    this.expose()
  },
  componentWillReceiveProps ({value}) {
    const stateValue = this.state.value
    const propsValue = this.props.value

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

    if (value === undefined && el.type === 'checkbox') {
      value = false
    }

    el._RECUR_ = value
  },
  onChange ({target}) {
    this.setValue(this.readValue(target))
  }
}
