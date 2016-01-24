#Formerly

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A form library for React that tries to make dealing with huge forms easier, it is particularly useful for forms that map to nested data structures and demand validation.

- Basics
- Validation
- Complex inputs

---------------

## Basics

```js
import React from 'react'
import {Form, Entity, Input, Select} from 'formerly'

export default React.createClass({
  displayName: 'NewsletterForm',
  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <label>Your name</label>
        <Input name='name' placeholder='nicolas cage' />
        
        <label>Email</label>
        <Input type='email' name='email' />
        
        <h3>Please help us know how to reach you</h3>
        <hr/>

        <Entity name='address'>
          <label>Street address</label>
          <Input name='streetAddress' />

          <label>Country</label>
          <Select name='country'>
            <option>France</option>
            <option>United States</option>
            <option>England</option>
            <option>Japan</option>
            <option>Germany</option>
            <option>Somewhere in the global south</option>
          </Select>
        </Entity>
        
        <hr/>
        
        <label>Tell us more about yourself</label>
        <TextArea name='nonsense' />
        
        <div className='very-small-text'>
          <Input id='sendSpam' type='checkbox' name='sendSpam' defaultValue={true} />
          <label htmlFor='sendSpam'>
            Would you like to discover the meaning of life?
          </label>
        </div>
        
        <button type='submit'>Submit</button>
      </Form>
    )
  },
  handleSubmit (errors, formData) {
      if (errors) return alert("please don't")
      
      // complicated AI stuff
      if (formData.address.country === 'Somewhere in the global south') {
        formData.sendSpam = false
      }
      if (formData.nonsense.match(/music/i)) {
        formData.sendSpam = 'spotity'
      }
      if (formData.nonsense.match(/movies/i)) {
        formData.sendSpam = 'netflix'
      }
      
      fetch('/big-data', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
    }
})

```

Diving into the contrived example above, we can see `formerly` exposes five key components: the first four are just extensions to native elements, namely, `Form`, `Input`, `Select` and `TextArea`.
The later three won't work outside a `Form` and `formerly` ignores any other native `<input>` you put inside the form... you see, it tries to get out of your way.
`Entity`, put simply, is an notation for creating nested objects or arrays (more on that later).