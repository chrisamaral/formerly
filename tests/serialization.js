import test from 'ava'
import form from './_form'

test(t => {
  t.same({
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
  }, form.serialize())

  t.end()
})
