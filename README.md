#Formerly

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A modest form library for React, designed to make large form serialization and validation easier. It aims to do so while keeping a healthy balance between declarativeness and readability.

- Basics
- Nesting
- API
- Complex inputs

---------------

## Basics

First thing you want to do is understand how to assemble your form from `formerly` components and use basic serialization.

```js
import React from 'react'
import {Form, Input, Select} from 'formerly'

function NewsletterForm () {
   return (
     <Form onSubmit={handleSubmit}>

       <label>Your name</label>
       <Input name='name' placeholder='nicolas cage' required/>

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
}

function handleSubmit (errors, formData) {
  if(errors) return alert("please don't")

   // complicated AI stuff
   if (formData.nonsense.match(/music/i)) {
     formData.sendSpamFrom = 'spotity'
   }

   fetch('/big-data', {
     method: 'POST',
     body: JSON.stringify(formData)
   })
}
```

Diving into the contrived example above, we can see `formerly` exposes a few components with familiar sounding names, `Form`, `Input`, `Select` and `TextArea`.
You can think of them as extensions to native elements. **Important takeaway: ** *They won't work outside a `Form` and `formerly` wont serialize any other native `<input>` you put inside the `Form`.*

## Nesting

An important use case we wanted to get just right was the serialization of large forms, which are often complex and have nested objects/arrays in them.

So let's say you work for Wikipedia and you have this **person** database storing all kinds of creepy personal information, our hypothetical object representation for a random personality could look like this:

```js
const thisOnePerson = {
	fullName: 'Samuel L. Jackson',
	occupations: ['actor', 'film producer'],
	almaMater: 'Morehouse College',
	birth: {
	  day: '12/21/1948',
	  place: 'Washington, D.C., U.S.'
	},
	significantOther: {
		fullName: 'LaTanya Richardson',
		occupations: ['actress', 'producer']
	},
	children: [{
		fullName: 'Zoe Jackson'
	}]
}
```
Now your job is to come up with a *single form* to fill all this stuff, scary right? Of course it is, especially from a UX point of view but a job is a job so... `formerly` to the rescue! Here is how we could represent that same object as a form component:

```js
import {Form, Entity, Input, Select} from 'formerly'

function handleSubmit (errors, person) {
 // ...
}

function PersonForm () {
  return (
    <Form onSubmit={handleSubmit}>
	    <label>Person Name</label>
	    <Input name='fullName' value='Samuel L. Jackson' />

		<h3>Occupations</h3><hr/>
		<Entity name='occupations'>
  		    <!-- using a number as *name* hints formerly
			    to serialize the entity as an array -->

		    <Input name={0} value='actor' />
		    <Input name={1} value='film producer' />
		</Entity>

		<label>Alma Mater</label>
		<Select name='almaMater'>
			<option>Morehouse College</option>
			<option>École Normale Superieure</option>
			<option>Oxford</option>
			<option>USP</option>
		</Select>


		<Entity name='birth'>
			<label>Birthday</label>
			<Input type='date' name='day' value='1948-12-21' />

			<label>Birth place</label>
			<Input name='place' value='Washington, D.C., U.S.' />
		</Entity>

		<Entity name='significantOther'>
		    <label>Significant Other</label>
		    <Input name='fullName' value='LaTanya Richardson' />

			<h3>Occupations</h3><hr/>
			<Entity name='occupations'>
			    <Input name={0} value='actress' />
			    <Input name={1} value='producer' />
			</Entity>
		</Entity>

		<Entity name='children'>
			<Entity name={0}>
				<label>Child name</label>
			    <Input name='fullName' value='Zoe Jackson' />
		    </Entity>
		</Entity>

       <button type='submit'>Submit</button>
    </Form>
  )
}

export default PersonForm
```

## API

- Form
