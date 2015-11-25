import {PropTypes} from 'react'

import validateEmail from './validation/email'
import validateRequired from './validation/required'
import validateLength from './validation/length'
import validateRange from './validation/range'

export default {
  propTypes: {
    children: PropTypes.node,
    onError: PropTypes.func,
    onChange: PropTypes.func,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array
    ]).isRequired,
    textarea: PropTypes.bool,
    type: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    shouldEqual: PropTypes.any,
    validator: PropTypes.func,
    required: PropTypes.bool
  },
  contextTypes: {
    getAbsoluteName: PropTypes.func.isRequired,
    triggerChange: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired
  },
  getInitialState () {
    const state = {
      value: this.props.value || this.props.defaultValue
    }

    if (state.value === undefined && this.props.type === 'checkbox') {
      state.value = false
    }

    state.error = this.getError(state.value)
    return state
  },
  componentDidMount () {
    this.subscribers = []
    this.refs.recur._subscribeTo = fn => {
      this.subscribers.push(fn)
      setTimeout(() => fn(this.state.value), 100)
    }
    this.refs.recur._RECUR_ = this
  },
  componentWillReceiveProps ({value}) {
    const propsValue = this.props.value || this.props.defaultValue

    if (!this.changedState && !(propsValue === value || this.same(propsValue, value))) {
      this.setValue(value)
    }
  },
  emitChange () {
    const {onError, onChange} = this.props
    const {name} = this.refs.recur
    const {value, error} = this.state

    if (onChange) onChange(value)
    if (onError) onError(error)

    this.context.triggerChange(name, value)
    this.context.triggerError(name, error)
  },
  setValue (value) {
    this.setState(
      {value, error: this.getError(value)},
      this.emitChange
    )
  },
  getError (value) {
    const {type, min, max, maxLength, minLength, shouldEqual, validator, required} = this.props
    const errors = {}

    if (typeof validator === 'function') {
      const res = validator(value)
      if (!res || res instanceof Error) errors.custom = res
    }

    if (required && !validateRequired(value, type)) {
      errors.required = true
    } else {
      if (shouldEqual !== undefined && shouldEqual !== value) errors.shouldEqual = true
      if ((min !== undefined || max !== undefined) && !validateRange(value, min, max)) errors.range = true
      if ((minLength !== undefined || maxLength !== undefined) && !validateLength(value, minLength, maxLength)) errors.length = true
      if (type === 'email' && !validateEmail(value)) errors.email = true
    }

    return Object.keys(errors).length ? errors : null
  },

  onChange ({target}) {
    this.changedState = true
    this.setValue(this.readValue(target))
  }
}
