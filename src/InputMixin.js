const {PropTypes} = require('react')
const obj = require('object-path')
const validate = require('./validation')

module.exports = {
  contextTypes: {
    getAbsoluteName: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    getError: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
  },
  componentWillMount () {
    let value = this.props.value || this.props.defaultValue

    if (value === undefined && this.props.type === 'checkbox') {
      value = false
    }

    this.setValue(value)
  },
  componentWillReceiveProps ({value}) {
    const propsValue = this.props.value || this.props.defaultValue

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
