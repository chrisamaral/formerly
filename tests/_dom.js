import jsdom from 'jsdom'

const FAKE_DOM_HTML = `<html><body></body></html>`
let targetDOMElem

const setupFakeDOM = () => {
  if (typeof document !== 'undefined') return

  global.document = jsdom.jsdom(FAKE_DOM_HTML)
  global.window = document.defaultView
  global.navigator = window.navigator
}

setupFakeDOM()

export const getRootElem = () => {
  if (targetDOMElem) {
    require('react').unmountComponentAtNode(targetDOMElem)
  }

  targetDOMElem = document.createElement('div')

  return targetDOMElem
}
