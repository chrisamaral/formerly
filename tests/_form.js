import {getRootElem} from './_dom'
import {render} from 'react-dom'
import {DOM, createFactory, createClass} from 'react'
import {Form, Input, Select, Entity} from '../lib'

const option = DOM.option.bind(null, null)
const label = DOM.label.bind(null, null)
const form = createFactory(Form)
const select = createFactory(Select)
const input = createFactory(Input)
const entity = createFactory(Entity)

const UserForm = createClass({
  serialize () {
    return this.refs.form.serialize()
  },
  render () {
    return form({ref: 'form'},

      label('name'),
      input({name: 'name', value: 'My name'}),

      label('Email'),
      input({type: 'email', name: 'email', value: 'email@examploe.com'}),

      entity({name: 'address'},

        entity({name: 'home'},

          label('Street'),
          input({name: 'street', value: 'Avenida Rio Branco'}),

          label('Number'),
          input({type: 'number', name: 'number', value: 1}),

          label('Neighborhood'),
          input({name: 'neighborhood', value: 'Centro'}),

          label('Country'),
          select({name: 'country'},
            option('Brazil')),

          label('State'),
          select({name: 'state'},
            option('RJ')),

          label('City'),
          select({name: 'city'},
            option('Rio de Janeiro')))),

      entity({name: 'phones'},
        input({type: 'tel', name: 0, value: '21977668639'}),
        input({type: 'tel', name: 1, value: '2130142818'})
      ))
  }
})

const userForm = createFactory(UserForm)

export default render(userForm(), getRootElem())
