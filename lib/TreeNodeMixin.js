import {PropTypes} from 'react'

export default {
  getChildContext  () {
    return {
      getName: this.getName
    }
  },
  childContextTypes: {
    getName: PropTypes.func.isRequired
  },
  componentWillMount () {
    this.children = {}
    this.id = 'node-' + Math.random().toString(36).substr(2)
  },
  getName (id, currentPath = null) {
    const isDirectChild = !Array.isArray(currentPath)
    const path = isDirectChild ? [currentPath] : currentPath

    if (this.context.getName) {
      path.unshift(this.props.name)
      this.context.getName(this.id, path)
    }

    return isDirectChild ? path.join('.') : path
  }
}
