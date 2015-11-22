import {PropTypes} from 'react'

export default {
  getChildContext  () {
    return {
      getAbsoluteName: this.getAbsoluteName
    }
  },
  childContextTypes: {
    getAbsoluteName: PropTypes.func.isRequired
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
