const formState = require('./formState')
const debounce = require('debounce')
const assign = require('object-assign')
const {DOM, createClass, PropTypes} = require('react')
const obj = require('object-path')
const omit = require('object.omit')

module.exports = createClass({
  displayName: 'Form',
  isForm: true,
  propTypes: {
    name: PropTypes.string,
    children: PropTypes.node.isRequired,
    useHTML5Validation: PropTypes.bool,
    persist: PropTypes.bool,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
  },
  getDefaultProps () {
    return {
      name: Math.random().toString(36).substr(2)
    }
  },
  childContextTypes: {
    getAbsoluteName: PropTypes.func.isRequired,
    onValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    getError: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
  },
  getChildContext () {
    return {
      getAbsoluteName: this.getAbsoluteName,
      onValue: this.onValue,
      getValue: this.getValue,
      setValue: this.setValue,
      onError: this.onError,
      getError: this.getError,
      setError: this.setError
    }
  },
  componentWillMount () {
    assign(this, formState(this.props.name))

    const _setValue = this.setValue

    const callOnChange = debounce(() => {
      const {onChange} = this.props

      if (onChange) {
        const {errors, values} = this.serialize()
        onChange(errors, values)
      }
    }, 100)

    this.setValue = (...args) => {
      _setValue(...args)
      callOnChange()
    }
  },
  getAbsoluteName (name) {
    return name
  },
  onSubmit (e) {
    e.preventDefault()

    const {onSubmit} = this.props

    if (!onSubmit) return

    const {errors, values} = this.serialize()

    onSubmit(errors, values)
  },
  reset () {
    this.refs.form.reset()
  },
  serialize () {
    const errors = obj({})
    const values = obj({})
    const visited = {}
    const {elements} = this.refs.form
    let hasError = false

    for (const key in elements) {
      const el = elements[key]

      if (!el || typeof el !== 'object' || el.name === undefined) continue
      if (el.type === 'radio' && !el.checked) continue
      if (el.dataset.formerly === undefined) continue

      if (visited[el.name] !== undefined) continue

      visited[el.name] = true

      const error = this.getError(el.name)

      values.set(el.name, this.getValue(el.name))

      if (error) {
        hasError = true
        errors.set(el.name, error)
      }
    }

    return {
      errors: hasError ? errors.get() : null,
      values: values.get()
    }
  },
  render () {
    const {onSubmit} = this
    const {children, useHTML5Validation} = this.props
    return DOM.form(assign(omit(this.props, 'children', 'onChange', 'onSubmit'), {
      onSubmit,
      ref: 'form',
      noValidate: !useHTML5Validation
    }), children)
  }
})
