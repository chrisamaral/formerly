import React, {PropTypes, cloneElement, Children, createClass} from 'react'
import {render} from 'react-dom'
import {Form, OnValue, TextArea, Entity, Input, Select} from '../src'
import Selectable from './Selectable'
import RandomResetButton from './RandomResetButton';

const genres = [
  'Country',
  'Eletronic',
  'Pop',
  'Rock',
  'Reggae',
  'Rap',
  'Classic'
]

const defaults = {
  emails: [{address: 'email@example.com', sendSpam: true}],
  favoriteLanguage: 'js',
  birthYear: 1991,
  favoriteGenres: ['Country', 'Rap']
}
const years = []
const updateSerialized = (e, serialized) => document.querySelector('pre').innerHTML = JSON.stringify(serialized, null, 2)

for (let i = 1990; i < new Date().getFullYear() - 18; i++) years.push(i)

const InputWrapper = createClass({
  displayName: 'InputWrapper',
  propTypes: {
    label: PropTypes.string,
    type: PropTypes.string,
    messages: PropTypes.object,
    children: PropTypes.node.isRequired
  },
  getDefaultProps () {
    return {type: 'form-group'}
  },
  getInitialState () {
    return {error: null}
  },
  render () {
    const {error} = this.state
    const {type, messages, label, children} = this.props
    const helpers = error
      ? (
      Object
        .keys(error)
        .map(key => messages[key]
          ? <p key={key} className='help-block'>{messages[key]}</p>
          : null
        ).filter(Boolean)
    ) : null

    return (
      <div className={type + (error ? ' has-error' : '')}>
        {label && <label>{label}</label>}
        {Children
          .map(children,
            child => cloneElement(child, {
              onChange: (error, value) => value !== undefined && this.setState({value, error})
            }))}
        {helpers}
      </div>
    )
  }
})

const ComplexForm = createClass({
  displayName: 'Complex form',
  getInitialState () {
    return {numOfPhones: 1, numOfEmails: 1, serialized: {}}
  },
  morePhones (e) {
    e.preventDefault()
    this.setState(({numOfPhones}) => numOfPhones++ && ({numOfPhones}))
  },
  moreEmails (e) {
    e.preventDefault()
    this.setState(({numOfEmails}) => numOfEmails++ && ({numOfEmails}))
  },
  componentDidMount () {
    updateSerialized(this.refs.form.serialize())
  },
  render () {
    const {numOfPhones, numOfEmails} = this.state
    const phones = []
    const emails = []

    for (let key = 0; key < numOfEmails; key++) {
      emails.push(
        <Entity name={key} key={key}>
          <div className='form-group'>
            <Input className='form-control' name='address' type='email'/>
          </div>
          <div className='checkbox'>
            <label>
              <Input type='checkbox' name='sendSpam'/>
              Send spam?
            </label>
          </div>
        </Entity>
      )
    }

    for (let key = 0; key < numOfPhones; key++) {
      phones.push(<Input className='form-control' name={key} type='tel' key={key}/>)
    }

    return (
      <Form ref='form'
            value={defaults}
            onSubmit={(e, body) => e && console.error(e)}
            onChange={updateSerialized}>

        <div className='form-group'>
          <label>Name</label>
          <Input className='form-control' name='name' minLength={4}/>
        </div>

        <label>Emails</label>

        <Entity name='emails'>
          {emails}
        </Entity>

        <a href='' onClick={this.moreEmails}>new email</a>

        <Input name='thing'>
          <Selectable/>
        </Input>

        <div className='form-group'>
          <label>Password</label>
          <Input className='form-control' name='password' type='password'/>
        </div>

        <div className='form-group'>
          <label>Repeat your password</label>
          <Input className='form-control' name='repeatPassword' type='password'/>
        </div>

        <OnValue in={['password', 'repeatPassword']}
                 test={({password, repeatPassword}) => password !== repeatPassword}>
          <p className='text-danger'>Passwords do not match</p>

          <RandomResetButton/>
        </OnValue>

        <div className='form-group'>
          <label>Born in</label>
          <Select className='form-control' name='birthYear'>
            <option value={null}>- Year -</option>
            {years.map((value, key) => (
              <option key={key}>{value}</option>
            ))}
          </Select>
        </div>

        <label>Language of choice</label>

        <div className='radio'>
          <label>
            <Input name='favoriteLanguage' type='radio' value='js'/>
            Javascript
          </label>
        </div>

        <div className='radio'>
          <label>
            <Input name='favoriteLanguage' type='radio' value='notJs'/>
            Not Javascript
          </label>
        </div>

        <OnValue in='favoriteLanguage' test={({favoriteLanguage}) => favoriteLanguage !== 'js'}>
          <p className='text-danger'>GET OUT</p>
        </OnValue>

        <div className='form-group'>
          <label>Favorite genres</label>
          <Select className='form-control' name='favoriteGenres' multiple>
            {genres.map((value, key) => (
              <option key={key}>{value}</option>
            ))}
          </Select>
        </div>

        <div className='form-group'>
          <label>Profile picture</label>
          <Input className='form-control' type='file' name='pic'/>
        </div>

        <label>Phones</label>
        <Entity name='phones'>
          {phones}
        </Entity>

        <a href='' onClick={this.morePhones}>new phones</a>

        <InputWrapper className='form-group' label='2 + 1' messages={{shouldEqual: 'Wrong answer'}}>
          <Input className='form-control' type='number' name='trivia' shouldEqual={3}/>
        </InputWrapper>

        <InputWrapper label='OBS' messages={{required: 'Please talk to me!', length: 'go on... please'}}>
          <TextArea className='form-control'
                    name='obs'
                    required
                    minLength={10}/>
        </InputWrapper>

        <button className='btn btn-primary' type='submit'>
          Submit
        </button>

      </Form>
    )
  }
})

render(<ComplexForm/>, document.getElementById('app'))
