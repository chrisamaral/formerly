import assign from 'object-assign'
import TreeNodeMixin from './TreeNodeMixin'
import {DOM, createClass, PropTypes} from 'react'
import obj from 'object-path'

const {form} = DOM

export default createClass({
  mixins: [TreeNodeMixin],
  displayName: 'Form',
  propTypes: {
    onSubmit: PropTypes.func
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

      if (el.name === name) return el._RECUR_
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
    const {onSubmit} = this.props
    if (onSubmit) onSubmit(this.serialize())
  },
  serialize () {
    const model = obj({})
    const checked = {}
    const {elements} = this.refs.form

    for (const key in elements) {
      const el = elements[key]

      if (!el || typeof el !== 'object') continue
      if (el.type === 'radio' && !el.checked) continue
      if (!el.name || checked[el.name] !== undefined) continue
      if (el._RECUR_ === undefined) continue

      checked[el.name] = true
      model.set(el.name, el._RECUR_)
    }

    return model.get()
  },
  render () {
    const {onSubmit} = this
    const {children, ...props} = this.props
    return form(assign(props, {onSubmit, ref: 'form'}), children)
  }
})
