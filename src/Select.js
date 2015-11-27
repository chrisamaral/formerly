const {Children, DOM, createClass, PropTypes} = require('react')
const almostSame = require('./utils/numberEqualString')
const multipleSame = require('./utils/arrayEqual')
const obj = require('object-path')
const InputMixin = require('./InputMixin')
const assign = require('object-assign')
const omit = require('object.omit')

const {select} = DOM

module.exports = createClass({
  mixins: [InputMixin],
  displayName: 'Select',
  isSelect: true,
  propTypes: {
    children: PropTypes.node.isRequired
  },
  componentWillMount () {
    let {value, error} = this.state
    const {children, multiple} = this.props

    if (value || multiple) return

    const options = Children.toArray(children)
    const firstValue = obj.get(options, '0.props.value') || obj.get(options, '0.props.children')

    if (typeof firstValue === 'number' || typeof firstValue === 'string') {
      value = firstValue
    }

    error = this.getError(value)
    this.setState({value, error})
  },
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
  same (a, b) {
    return almostSame(a, b) || (Array.isArray(a) && Array.isArray(b) && multipleSame(a, b))
  },
  render () {
    const {value} = this.state
    const {getAbsoluteName} = this.context
    const {onChange} = this
    const {name, children} = this.props
    const otherProps = omit(this.props, 'name', 'children')

    return select(assign(otherProps, {
      ref: 'recur',
      name: getAbsoluteName(name),
      onChange,
      value
    }), children)
  }
})
