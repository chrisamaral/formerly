import {createClass, DOM, createFactory} from 'react'
import {Form, Entity, Input, Select} from '../lib'

const {button, p, option} = DOM
const label = DOM.label.bind(null, null)
const select = createFactory(Select)
const form = createFactory(Form)
const entity = createFactory(Entity)
const input = createFactory(Input)
const phones = ['97516519', '30142818']
const genres = [
  'Eletronic',
  'Pop',
  'Rock',
  'Reggae',
  'Rap',
  'Classic'
]
const years = []

for (let i = 1990; i < new Date().getFullYear() - 18; i++) years.push(i)

export default createClass({
  render () {
    return form({onSubmit: console.log.bind(console)},
      entity({name: 'person'},

        p(null, label('Name')),
        p(null, input({name: 'name'})),

        p(null, label('Born in')),
        p(null, select({name: 'birthYear'},
          years.map((value, key) =>
            option({key, value}, value)))),

        p(null, label('Favorite genre')),
        p(null, select({name: 'favoriteGenres', multiple: true},
          genres.map((value, key) =>
            option({key, value}, value)))),

        p(null, label('Profile picture')),
        p(null, input({type: 'file', name: 'pic'})),

        p(null, label('Phones')),
        entity({name: 'phones'},
          phones.map((value, key) => p({key},
            input({
              type: 'tel',
              value,
              name: key
            })))),

        button({type: 'submit'}, 'Submit')))
  }
})
