import {PropTypes} from 'react'

export default {
  getChildContext  () {
    return {
      getAbsoluteName: this.getAbsoluteName,
      subscribeTo: this.subscribeTo
    }
  },
  childContextTypes: {
    getAbsoluteName: PropTypes.func.isRequired,
    subscribeTo: PropTypes.func.isRequired
  },
  componentWillMount () {
    this.queue = []
  },
  componentDidMount () {
    this.queue.forEach(fn => fn())
  },
  subscribeTo (name, fn) {
    if (this.refs.recur) {
      name = `${this.refs.recur.dataset.name}.${name}`
      this.context.listenTo(name, fn)
    } else {
      this.listenTo(name, fn)
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
