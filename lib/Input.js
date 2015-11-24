import assign from 'object-assign'
import {DOM, cloneElement, Children, createClass} from 'react'
import InputMixin from './InputMixin'

const {div, input} = DOM

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
    const {value, error} = this.state
    const {onChange, setValue} = this
    const {name, children, textarea, ...otherProps} = this.props
    let type = this.props.type || 'text'

    if (!children) {
      const elem = textarea ? DOM.textarea : input
      return elem(assign(otherProps, {
        ref: 'recur',
        name: getAbsoluteName(name),
        type,
        onChange,
        value: parseInputType(type, value)
      }))
    }

    return div(null,

      input({
        ref: 'recur',
        name: getAbsoluteName(name),
        type: 'hidden',
        value
      }),

      Children.map(children,
        child => cloneElement(child,
          {setValue, value, error})))
  }
})
