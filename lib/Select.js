import {Children, DOM, createClass} from 'react'
import InputMixin from './InputMixin'
import assign from 'object-assign'

const {select} = DOM

export default createClass({
  mixins: [InputMixin],
  displayName: 'Select',
  readValue ({value, multiple, options}) {
    let selected = multiple ? [] : value
    const children = Children.toArray(this.props.children)

    for (let i in options) {
      if (!options[i].selected) continue

      const optionValue = children[i].props.value || options[i].value

      if (!multiple) return optionValue

      selected.push(optionValue)
    }
    return selected
  },
  render () {
    const {value} = this.state
    const {getName} = this.context
    const {onChange, id} = this
    const {name, children, ...otherProps} = this.props
    return select(assign(otherProps, {
      ref: 'recur',
      name: getName(id, name),
      onChange,
      value
    }), children)
  }
})
