#Formerly

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A form library for React, particularly useful for forms that need to map to nested objects and demand validation.

- Basics
- Nesting
- API
- Complex inputs

---------------

## Basics

First thing you want to do is understand how to assemble your form from `formerly` components and use serialization.

```js
import React from 'react'
import {Form, Input, Select} from 'formerly'

export default React.createClass({
  displayName: 'NewsletterForm',
  render () {
    return (
      <Form onSubmit={this.handleSubmit}>

        <label>Your name</label>
        <Input name='name' placeholder='nicolas cage' />

        <label>Email</label>
        <Input type='email' name='email' />

        <label>How do you commute to work?</label>
        <Select name='wayOfTransp'>
          <option>Car</option>
          <option>Bus</option>
          <option>Bike</option>
          <option>Dont work</option>
        </Select>

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
    if (formData.nonsense.match(/music/i)) {
      formData.sendSpamFrom = 'spotity'
    }
    
    fetch('/big-data', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
  }
})
```

Diving into the contrived example above, we can see `formerly` exposes a few components with familiar sounding names, `Form`, `Input`, `Select` and `TextArea`. 
You can think of them as extensions to native elements. **They won't work outside a `Form` and `formerly` wont serialize any other native `<input>` you put inside the `Form`.**

## Nesting

An important use case is 

## API

- * Form * - 
