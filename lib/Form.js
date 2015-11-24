import assign from 'object-assign'
import TreeNodeMixin from './TreeNodeMixin'
import {DOM, createClass, PropTypes} from 'react'
import obj from 'object-path'
import omit from 'object.omit'

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
    this.errorListeners = {}
  },
  componentDidMount () {
    for (let name in this.listeners) {
      if (this.listeners.hasOwnProperty(name)) {
        this.triggerChange(name)
      }
    }
    for (let name in this.errorListeners) {
      if (this.errorListeners.hasOwnProperty(name)) {
        this.triggerError(name)
      }
    }
  },
  getChildContext () {
    return {
      waitForValue: this.waitForValue,
      waitForError: this.waitForError,
      triggerChange: this.triggerChange,
      triggerError: this.triggerError
    }
  },
  childContextTypes: {
    waitForError: PropTypes.func.isRequired,
    waitForValue: PropTypes.func.isRequired,
    triggerChange: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired
  },
  triggerChange (name, value) {
    if (!this.listeners[name]) return
    this.listeners[name]
      .forEach(fn =>
        fn(value !== undefined
          ? value
          : this.getValueOf(name)))
  },
  triggerError (name, error, value) {
    if (!this.errorListeners[name]) return
    this.errorListeners[name]
      .forEach(fn =>
        fn(error !== undefined
            ? error
            : this.getErrorIn(name),
          value !== undefined
            ? value
            : this.getValueOf(name)
        ))
  },
  getValueOf (name) {
    const {elements} = this.refs.form
    for (let i in elements) {
      const el = elements[i]

      if (!el || typeof el !== 'object') continue
      if (el.type === 'radio' && !el.checked) continue

      if (el.name === name) return el._RECUR_.state.value
    }
  },
  getErrorIn (name) {
    const {elements} = this.refs.form
    for (let i in elements) {
      const el = elements[i]

      if (!el || typeof el !== 'object') continue

      if (el.name === name) return el._RECUR_.state.error
    }
  },
  waitForValue (name, fn) {
    const listeners = this.listeners[name] = this.listeners[name] || []
    listeners.push(fn)
    return () => {
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i] === fn) {
          listeners.splice(i, 1)
          break
        }
      }
    }
  },
  waitForError (name, fn) {
    const listeners = this.errorListeners[name] = this.errorListeners[name] || []
    listeners.push(fn)
    return () => {
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i] === fn) {
          listeners.splice(i, 1)
          break
        }
      }
    }
  },
  onSubmit (e) {
    e.preventDefault()

    const {onSubmit, onError} = this.props
    const res = this.serialize(true)

    if (res instanceof Error) {
      if (onError) onError(res.errors, res.values)

      return
    }

    if (onSubmit) onSubmit(res)
  },
  reset () {
    this.refs.form.reset()
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
    const {children, useHTML5Validation} = this.props
    return form(assign(omit(this.props, 'children'), {
      onSubmit,
      ref: 'form',
      noValidate: !useHTML5Validation
    }), children)
  }
})
