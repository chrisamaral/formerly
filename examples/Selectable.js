import React, {createClass} from 'react'

const listOfRandomThings = Object.keys(navigator.__proto__)
  .map(m => ({name: `navigator.${m}`, reference: navigator[m]}))

const Selectable = ({value, setValue}) => (
  <div>
    <h5>Please pick one</h5>
    <div className='list-group' style={{height: 300, overflowY: 'scroll'}}>
      {listOfRandomThings.map((thing, index) => (
        <a key={index}
           className={'list-group-item' + (value === thing ? ' active' : '')}
           onClick={e => e.preventDefault() + setValue(thing)}>
          {thing.name}
        </a>
      ))}
    </div>
  </div>
)

Selectable.displayName = 'Selectable'
export default Selectable