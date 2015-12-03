import {expect} from 'chai'
import form from './_form'

describe('serialization', () => {
  it('works', () =>
    expect({
      name: 'My name',
      email: 'email@examploe.com',
      address: {
        home: {
          street: 'Avenida Rio Branco',
          number: 1,
          country: 'Brazil',
          neighborhood: 'Centro',
          state: 'RJ',
          city: 'Rio de Janeiro'
        }
      },
      phones: [
        '21977668639',
        '2130142818'
      ]
    }).to.deep.equal(form.serialize())
  )
})
