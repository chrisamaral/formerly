import assign from 'object-assign'
import {DOM, createClass} from 'react'
import InputMixin from './InputMixin'

const {input} = DOM

const parseInputType = (type, value) =>
  type === 'file'
    ? undefined
    : value

export default createClass({
  mixins: [InputMixin],
  displayName: 'Input',
  readValue ({checked, type, value, files}) {
    switch (type) {
      case 'file':
        return files[0]
      case 'checkbox':
        return Boolean(checked)
      case 'number':
        return parseFloat(value)
      default:
        return value
    }
  },
  render () {
    const {getAbsoluteName} = this.context
    const {value} = this.state
    const {onChange} = this
    const {name, ...otherProps} = this.props
    let type = this.props.type || 'text'

    return input(assign(otherProps, {
      ref: 'recur',
      name: getAbsoluteName(name),
      type,
      onChange,
      value: parseInputType(type, value)
    }))
  }
})
