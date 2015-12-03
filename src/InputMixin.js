const {PropTypes} = require('react')
const obj = require('object-path')
const validate = require('./validation')

module.exports = {
  contextTypes: {
    onReset: PropTypes.func.isRequired,
    getAbsoluteName: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    getError: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
  },
  getDefaultValue () {
    const fromProps = this.props.value === undefined ? this.props.defaultValue : this.props.value
    let value = fromProps !== undefined
      ? fromProps
      : this.context.getValue(this.getName())

    if (value === undefined && this.props.type === 'checkbox') {
      value = false
    }
    if (value === undefined && this.firstOption) {
      value = this.firstOption()
    }
    return value
  },
  componentWillMount () {
    this.setValue(this.getDefaultValue())
  },
  componentDidMount () {
    this.unsubscribe = this.context.onReset(() => {
      this.setValue(this.getDefaultValue())
      this.forceUpdate()
    })
  },
  componentWillUnmount () {
    this.unsubscribe()
  },
  componentWillReceiveProps ({value}) {
    const propsValue = this.props.value === undefined ? this.props.defaultValue : this.props.value

    if (!this.changedState && !(propsValue === value || this.same(propsValue, value))) {
      this.setValue(value)
    }
  },
  setValue (value) {
    const {type, checked, onChange} = this.props
    const isRadio = type === 'radio'
    const isChecked = obj.get(this, 'refs.mainElement.checked', checked) === true

    if (isRadio && !isChecked) return

    const name = this.getName()
    const error = validate(value, this.props)

    this.context.setValue(name, value)
    this.context.setError(name, error)

    if (onChange) onChange(error, value)
  },
  getName () {
    return this.context.getAbsoluteName(this.props.name)
  },
  changeValueTo (value) {
    this.changedState = true
    this.setValue(value)
    this.forceUpdate()
  },
  onChange ({target}) {
    this.changeValueTo(this.readValue(target))
  }
}
