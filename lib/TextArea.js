import {createElement} from 'react'
import assign from 'object-assign'
import Input from './Input'

const TextArea = props => createElement(Input, assign({textarea: true}, props))

TextArea.displayName = 'TextArea'

export default TextArea
