import assign from 'object-assign'
import {DOM, createClass} from 'react'
import InputMixin from './InputMixin'

const {input} = DOM

const parseInputType = (type, value) => {
  if (type === 'file') return undefined
  return value
}

export default createClass({
  mixins: [InputMixin],
  displayName: 'Input',
  readValue ({type, value, files}) {
    switch (type) {
      case 'file':
        return files[0]
      default:
        return value
    }
  },
  render () {
    const {getName} = this.context
    const {value} = this.state
    const {id, onChange} = this
    const {name, ...otherProps} = this.props
    let type = this.props.type || 'text';

    return input(assign(otherProps, {
      ref: 'recur',
      name: getName(id, name),
      type,
      onChange,
      value: parseInputType(type, value)
    }))
  }
})
