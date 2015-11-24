#React Form Thing

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

A library for writing dynamic React forms with ease.
 
```javascript
import React, {createClass} from 'react'
import {render} from 'react-dom'
import {Form, Select, OnError, Input, Entity} from 'react-form-thing'

const NewsletterForm = createClass({
  render () {
    return (
      <Form ref='form' onSubmit={this.onSubmit} onError={this.onError}>
        
        <label>Your name</label>
        <Input name='myName' value='nicolas cage' />
        
        <label>Your best friend name</label>
        <Input name='bestFriend' shouldEqual='Obama' value='None' />
        
        <label>Are you older than 18?</label>
        <Input type='checkbox' name='is18Plus'/>
        
        <Entity name='addresses'>
            <Entity name='home'>
              <label>Home address</label>
              <Input name='streetAddress' value='1600 Pennsylvania Ave NW, Washington, DC 20500, United States' />
              <Input name='reference' value='Largest house in the block' />
            </Entity>
            <Entity name='hideSpot'>
              <label>Secret hide spot</label>
              <Input name='streetAddress' placeholder='Please fill this one' required />
              
              <OnError in='streetAddress'>
                You really should fill this one
              </OnError>
              
              <Input name='reference' />
            </Entity>
        </Entity>
        
        <label>Emails</label>
        <Entity name='emails'>
            <Input name={0} type='email' value='webmaster@example.com' />
        </Entity>
        
        <label>Favorite music</label>
        <Select name='music'>
          <option>Country</option>
          <option>Rap</option>
        </Select>
        
        <button type='submit'>Submit</button>
      </Form>
    )
  },
  onSubmit ({is18Plus, emails}) {
    const url = is18Plus ? 'http://adult-site.com' : 'http://disney.com'
    
    fetch(url, {method: 'POST', body: emails})
      .then(() => alert('Check your SPAM box'))
      .then(() => this.refs.form.reset())
  },
  onError (errors, body) {
    if (errors.hideSpot) {
      return alert('You forgot some required fields')
    } 
    
    if (errors.bestFriend) {
      // bestFriend !== 'Obama'
      return fetch('https://nsa.gov', {method: 'POST', body})
        .then(() => location.href = 'http://www.wikihow.com/Deal-with-Being-in-Prison')
    }
    
    alert("This is why we can't have nice things")
  },
  serialize () {
    return this.refs.form.serialize()
  }
})

const form = render(<NewsletterForm />, document.body)

assert.deepEqual(form.serialize(), {
  myName: 'nicolas cage',
  bestFriend: 'None',
  is18Plus: false,
  addresses: {
    home: {
      streetAddress: '1600 Pennsylvania Ave NW, Washington, DC 20500, United States',
      reference: 'Largest house in the block'
    }
  },
  emails: ['webmaster@example.com'],
  music: 'Country'
})
```