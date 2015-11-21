import {PropTypes} from 'react'

export default {
  propTypes: {
    children: PropTypes.node,
    name: PropTypes.string,
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
    this.refs.recur._RECUR_ = this.state.value
  }
}
