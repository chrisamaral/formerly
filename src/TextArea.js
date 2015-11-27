const {createElement} = require('react')
const assign = require('object-assign')
const Input = require('./Input')

const TextArea = props => createElement(Input, assign({textarea: true}, props))

TextArea.displayName = 'TextArea'

module.exports = TextArea
