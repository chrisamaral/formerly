import {Children, DOM, createClass} from 'react'
import InputMixin from './InputMixin'
import assign from 'object-assign'

const {select} = DOM

export default createClass({
  mixins: [InputMixin],
  displayName: 'Input',
  onChange ({target: {value, options}}) {
    const children = Children.toArray(this.props.children)

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        value = children[i].props.value || value
        break
      }
    }

    this.setValue(value)
  },
  render () {
    const {value} = this.state
    const {getName} = this.context
    const {onChange, id} = this
    const {name, children, ...otherProps} = this.props
    return select(assign(otherProps, {
      name: getName(id, name),
      onChange,
      value
    }), children)
  }
})
