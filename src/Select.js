const {Children, DOM, createClass, PropTypes} = require('react')
const almostSame = require('./utils/numberEqualString')
const multipleSame = require('./utils/arrayEqual')
const obj = require('object-path')
const InputMixin = require('./InputMixin')
const assign = require('object-assign')
const omit = require('object.omit')
const validate = require('./validation')

const {select} = DOM

module.exports = createClass({
  mixins: [InputMixin],
  displayName: 'Select',
  propTypes: {
    children: PropTypes.node,
    onChange: PropTypes.func,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    required: PropTypes.bool,
    multiple: PropTypes.bool
  },
  componentWillMount () {
    const name = this.getName()
    let value = this.context.getValue(name)
    const {children, multiple} = this.props

    if (value || multiple) return

    const options = Children.toArray(children)
    const firstValue = obj.get(options, '0.props.value', obj.get(options, '0.props.children'))

    if (typeof firstValue === 'number' || typeof firstValue === 'string') {
      value = firstValue
    }

    this.context.setValue(name, value)
    this.context.setError(name, validate(value, this.props))
  },
  readValue ({value, multiple, options}) {
    let selected = multiple ? [] : value
    const children = Children.toArray(this.props.children)

    for (let i in options) {
      if (!options[i].selected) continue

      const optionValue = children[i].props.value === undefined
        ? options[i].value
        : children[i].props.value

      if (!multiple) return optionValue

      selected.push(optionValue)
    }

    return selected
  },
  same (a, b) {
    return almostSame(a, b) || (Array.isArray(a) && Array.isArray(b) && multipleSame(a, b))
  },
  render () {
    const name = this.getName()
    const value = this.context.getValue(name)
    const {onChange} = this
    const {children} = this.props
    const otherProps = omit(this.props, 'name', 'children')

    return select(assign(otherProps, {
      'data-formerly': '',
      ref: 'mainElement',
      name,
      onChange,
      value
    }), children)
  }
})
