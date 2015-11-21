import {PropTypes} from 'react'

export default {
  getChildContext  () {
    return {
      getName: this.getName,
      dropInput: this.dropInput
    }
  },
  childContextTypes: {
    getName: PropTypes.func.isRequired,
    dropInput: PropTypes.func.isRequired
  },
  componentWillMount () {
    this.children = {}
    this.id = 'node-' + Math.random().toString(36).substr(2)
  },
  getName (id, currentPath = null) {
    const isDirectChild = !Array.isArray(currentPath)
    const path = isDirectChild ? [currentPath] : currentPath

    if (!path[0]) {
      this.listMode = true
      path[0] = this.children[id] || Object.keys(this.children).length
      this.children[id] = path[0]
    }

    if (this.context.getName) {
      path.unshift(this.props.name)
      this.context.getName(this.id, path)
    }

    return isDirectChild ? path.join('.') : path
  },
  dropInput () {
    this.children = {}
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.isMounted() && this.forceUpdate(), 100)
  }
}
