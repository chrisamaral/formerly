import test from 'ava'
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
      input({name: 'name', value: ''}),

      label('Email'),
      input({type: 'email', name: 'email', value: ''}),

      entity({name: 'address'},

        entity({name: 'home'},

          label('Street'),
          input({name: 'street', value: 'Avenida Rio Branco'},

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
              option('Rio de Janeiro'))))),

      entity({name: 'phones'},
        input({type: 'tel', value: '21977668639'}),
        input({type: 'tel', value: '2130142818'})
      ))
  }
})

const userForm = createFactory(UserForm)

const serialized = {
  name: 'input value',
  email: 'email@examploe.com',
  address: {
    home: {
      street: 'Avenida Rio Branco 1',
      number: 1,
      neighborhood: 'Centro',
      state: 'RJ',
      city: 'Rio de Janeiro'
    }
  },
  phones: [
    '21977668639',
    '2130142818'
  ]
}

const mountForm = () => render(userForm(), getRootElem())

test(t => t.same(serialized, mountForm().serialize()))
