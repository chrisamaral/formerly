import assign from 'object-assign'
import {DOM, createClass, PropTypes} from 'react'
import InputMixin from './InputMixin'
const {input} = DOM

export default createClass({
  mixins: [InputMixin],
  displayName: 'Input',
  onChange ({target: {value}}) {
    this.setValue(value)
  },
  render () {
    const {getName} = this.context
    const {value} = this.state
    const {id, onChange} = this
    const {name, type, ...otherProps} = this.props

    return input(assign(otherProps, {
      type: type || 'text',
      name: getName(id, name),
      onChange,
      value
    }))
  }
})
