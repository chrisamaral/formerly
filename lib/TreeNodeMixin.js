import {PropTypes} from 'react'

export default {
  getChildContext  () {
    return {
      getAbsoluteName: this.getAbsoluteName,
      subscribeTo: this.subscribeTo,
      subscribeToError: this.subscribeToError
    }
  },
  childContextTypes: {
    getAbsoluteName: PropTypes.func.isRequired,
    subscribeTo: PropTypes.func.isRequired,
    subscribeToError: PropTypes.func.isRequired
  },
  componentWillMount () {
    this.queue = []
  },
  componentDidMount () {
    this.queue.forEach(fn => fn())
  },
  subscribeToError (name, fn) {
    if (this.refs.recur) {
      name = `${this.refs.recur.dataset.name}.${name}`
      this.context.waitForError(name, fn)
    } else {
      this.waitForError(name, fn)
    }
  },
  subscribeTo (name, fn) {
    if (this.refs.recur) {
      name = `${this.refs.recur.dataset.name}.${name}`
      this.context.waitForValue(name, fn)
    } else {
      this.waitForValue(name, fn)
    }
  },
  getAbsoluteName (currentPath = null) {
    const isDirectChild = !Array.isArray(currentPath)
    const path = isDirectChild ? [currentPath] : currentPath

    if (this.context.getAbsoluteName) {
      path.unshift(this.props.name)
      this.context.getAbsoluteName(path)
    }

    return isDirectChild ? path.join('.') : path
  }
}
