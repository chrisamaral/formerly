import {createClass, DOM, createFactory} from 'react'
import {Form, Entity, Input, Select} from '../lib'

const {button, a, p, option} = DOM
const label = DOM.label.bind(null, null)
const select = createFactory(Select)
const form = createFactory(Form)
const entity = createFactory(Entity)
const input = createFactory(Input)
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
  displayName: 'Basic form',
  getInitialState () {
    return {numOfPhones: 1, numOfEmails: 1}
  },
  morePhones (e) {
    e.preventDefault()
    this.setState(({numOfPhones}) => numOfPhones++ && ({numOfPhones}))
  },
  moreEmails (e) {
    e.preventDefault()
    this.setState(({numOfEmails}) => numOfEmails++ && ({numOfEmails}))
  },
  render () {
    const {numOfPhones, numOfEmails} = this.state
    const phones = []
    const emails = []

    for (let key = 0; key < numOfEmails; key++) {
      emails.push(entity({key, name: key},
        p(null, input({name: 'address'})),
        p(null, label(
          input({type: 'checkbox', name: 'sendSpam'}),
          'Send spam?'
        ))))
    }

    for (let key = 0; key < numOfPhones; key++) {
      phones.push(p({key}, input({
        type: 'tel',
        name: key
      })))
    }

    return form({onSubmit: console.log.bind(console)},

      p(null, label('Name')),
      p(null, input({name: 'name'})),

      p(null, label('Emails')),
      entity({name: 'emails'}, emails),

      a({href: '', onClick: this.moreEmails}, 'new email'),

      p(null, label('Born in')),
      p(null, select({name: 'birthYear'},
        years.map((value, key) =>
          option({key, value}, value)))),

      p(null, label('Language of choice')),
      p(null, label(
        input({name: 'favoriteLanguage', type: 'radio', value: 'js'}),
        'Javascript')),

      p(null, label(
        input({name: 'favoriteLanguage', type: 'radio', value: 'notJs'}),
        'Not Javascript')),

      p(null, label('Favorite genres')),
      p(null, select({name: 'favoriteGenres', multiple: true},
        genres.map((value, key) =>
          option({key, value}, value)))),

      p(null, label('Profile picture')),
      p(null, input({type: 'file', name: 'pic'})),

      p(null, label('Phones')),
      entity({name: 'phones'},
        phones),

      a({href: '', onClick: this.morePhones}, 'new phone'),

      p(null, button({type: 'submit'}, 'Submit')))
  }
})
