import React, {PropTypes} from 'react'

const RandomResetButton = (props, {resetForm}) => (
  <button className='btn btn-danger' onClick={resetForm}>
    Just reset the form then
  </button>
)

RandomResetButton.contextTypes = {
  resetForm: PropTypes.func.isRequired
}

export default RandomResetButton
