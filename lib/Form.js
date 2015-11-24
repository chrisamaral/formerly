import assign from 'object-assign'
import TreeNodeMixin from './TreeNodeMixin'
import {DOM, createClass, PropTypes} from 'react'
import obj from 'object-path'

class FormError extends Error {
  constructor (errors, values) {
    super('Form contains errors')
    this.errors = errors
    this.values = values
  }
}

const {form} = DOM

export default createClass({
  mixins: [TreeNodeMixin],
  displayName: 'Form',
  propTypes: {
    onSubmit: PropTypes.func,
    onError: PropTypes.func
  },
  componentWillMount () {
    this.listeners = {}
  },
  componentDidMount () {
    for (let name in this.listeners) {
      if (this.listeners.hasOwnProperty(name)) {
        this.triggerChange(name)
      }
    }
  },
  getChildContext () {
    return {
      listenTo: this.listenTo,
      triggerChange: this.triggerChange
    }
  },
  childContextTypes: {
    listenTo: PropTypes.func.isRequired,
    triggerChange: PropTypes.func.isRequired
  },
  triggerChange (name, value) {
    if (!this.listeners[name]) return
    this.listeners[name]
      .forEach(fn =>
        fn(value !== undefined
          ? value
          : this.getValueFor(name)))
  },
  getValueFor (name) {
    const {elements} = this.refs.form
    for (let i in elements) {
      const el = elements[i]

      if (!el || typeof el !== 'object') continue
      if (el.type === 'radio' && !el.checked) continue

      if (el.name === name) return el._RECUR_.state.value
    }
  },
  listenTo (name, fn) {
    this.listeners[name] = this.listeners[name] || []
    this.listeners[name].push(fn)
    return () => {
      for (let i = 0; i < this.listeners.length; i++) {
        if (this.listeners[i] === fn) {
          this.listeners.splice(i, 1)
        }
      }
    }
  },
  onSubmit (e) {
    e.preventDefault()

    const {onSubmit, onError} = this.props
    const res = this.serialize(true)

    if (res instanceof FormError) {
      if (onError) onError(res.errors, res.values)

      return
    }

    if (onSubmit) onSubmit(res)
  },
  serialize (validate) {
    const errors = obj({})
    const model = obj({})
    const visited = {}
    const {elements} = this.refs.form
    let hasError = false

    for (const key in elements) {
      const el = elements[key]

      if (!el || typeof el !== 'object') continue
      if (el.type === 'radio' && !el.checked) continue
      if (!el._RECUR_ || !el.name || visited[el.name] !== undefined) continue

      visited[el.name] = true

      if (el._RECUR_.state.error) {
        hasError = true
        errors.set(el.name, el._RECUR_.state.error)
      }

      if (obj.get(el, '_RECUR_.state.value') === undefined) continue

      model.set(el.name, el._RECUR_.state.value)
    }

    if (validate && hasError) {
      return new FormError(errors.get(), model.get())
    }

    return model.get()
  },
  render () {
    const {onSubmit} = this
    const {children, ...props} = this.props
    return form(assign(props, {onSubmit, ref: 'form'}), children)
  }
})
