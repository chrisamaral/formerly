const obj = require('object-path')
const curry = require('curry')
const Emitter = require('emmett')

const emitter = new Emitter()
const state = obj({
  error: {},
  value: {}
})

const actions = {
  get: curry((node, formId, inputName) => {
    const name = `${node}.${formId}.${inputName}`
    return state.get(name)
  }),
  set: curry((node, formId, inputName, value) => {
    const name = `${node}.${formId}.${inputName}`

    state.set(name, value)

    let startAt = 1
    let dotIndex = name.indexOf('.', startAt)

    while (dotIndex >= 0) {
      const currentPath = name.substr(0, dotIndex)
      emitter.emit(currentPath, state.get(currentPath))
      startAt = dotIndex + 1
      dotIndex = name.indexOf('.', startAt)
    }

    emitter.emit(name, value)
  }),
  listen: curry((node, formId, inputName, fn) => {
    const name = `${node}.${formId}.${inputName}`
    emitter.on(name, fn)
    return () => emitter.off(name, fn)
  })
}

function formState (formId) {
  return {
    onValue: actions.listen('value', formId),
    getValue: actions.get('value', formId),
    setValue: actions.set('value', formId),
    setRoot: (error, value) => {
      state.set(`error.${formId}`, error)
      state.set(`value.${formId}`, value)
    },
    root: state.get(),
    onError: actions.listen('error', formId),
    getError: actions.get('error', formId),
    setError: actions.set('error', formId)
  }
}

module.exports = formState
