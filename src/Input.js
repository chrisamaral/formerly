const assign = require('object-assign')
const almostSame = require('./utils/numberEqualString')
const {DOM, cloneElement, Children, createClass} = require('react')
const InputMixin = require('./InputMixin')
const omit = require('object.omit')

const {div, input} = DOM

const parseInputType = (type, value) => {
  switch (type) {
    case 'hidden':
    case 'file':
      return undefined
    default:
      return value
  }
}

module.exports = createClass({
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
  same (a, b) {
    return almostSame(a, b)
  },
  render () {
    const {getAbsoluteName} = this.context
    const {value, error} = this.state
    const {onChange, setValue} = this
    const {name, children, textarea} = this.props
    const otherProps = omit(this.props, 'name', 'children', 'textarea')

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
        value: parseInputType('hidden', value)
      }),

      Children.map(children,
        child => cloneElement(child,
          {setValue, value, error})))
  }
})
