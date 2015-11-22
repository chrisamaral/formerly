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

      if (typeof el !== 'object') continue
      if (!el.name || checked[el.name] !== undefined) continue
      if (el._RECUR_ === undefined) continue

      checked[el.name] = true
      model.set(el.name, el._RECUR_ || el.value)
    }

    return model.get()
  },
  render () {
    const {onSubmit} = this
    const {children, ...props} = this.props
    return form(assign(props, {onSubmit, ref: 'form'}), children)
  }
})
