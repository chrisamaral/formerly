const assign = require('object-assign')
const almostSame = require('./utils/numberEqualString')
const {PropTypes, DOM, cloneElement, Children, createClass} = require('react')
const InputMixin = require('./InputMixin')
const omit = require('object.omit')

const {div, input} = DOM

module.exports = createClass({
  mixins: [InputMixin],
  displayName: 'Input',
  propTypes: {
    children: PropTypes.node,
    onChange: PropTypes.func,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    ignore: PropTypes.bool,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
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
    onValue: PropTypes.func.isRequired
  },
  componentDidMount () {
    if (this.props.type === 'radio') {
      this.unsubscribe = this.context.onValue(this.getName(), () => this.forceUpdate())
    }
  },
  componentWillUnmount () {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  readValue ({name, checked, type, value, files}) {
    switch (type) {
      case 'file':
        return files[0]
      case 'radio':
        return this.props.value !== undefined ? this.props.value : value
      case 'checkbox':
        return Boolean(checked)
      case 'number':
        this.skipValue = value === ''
        return this.skipValue ? this.context.getValue(name) : Number(value)
      default:
        return value
    }
  },
  same (a, b) {
    return almostSame(a, b)
  },
  render () {
    const name = this.getName()
    let value = this.context.getValue(name)
    const error = this.context.getError(name)
    const {onChange} = this
    const {children, textarea, ignore} = this.props
    let defaultValue
    let type = this.props.type || 'text'

    const ref = 'mainElement'

    if (!children) {
      const otherProps = omit(this.props, 'name', 'children', 'textarea')
      const elem = textarea ? DOM.textarea : input
      if (type === 'radio') {
        otherProps.checked = value === otherProps.value || (value === undefined && (otherProps.checked || otherProps.defaultChecked))
        value = this.props.value
      }
      if (type === 'checkbox') {
        otherProps.checked = Boolean(value)
      }
      if (type === 'file') value = undefined
      if (type === 'number' && this.skipValue) {
        defaultValue = value
        value = undefined
      }
      return elem(assign(otherProps, {
        'data-formerly': ignore ? null : '',
        ref,
        name,
        type,
        onChange,
        value,
        defaultValue
      }))
    }

    return div(null,

      input({
        'data-formerly': ignore ? null : '',
        name,
        ref,
        type: 'hidden',
        value: undefined
      }),

      Children.map(children,
        child => cloneElement(child,
          {setValue: this.changeValueTo, value, error})))
  }
})
