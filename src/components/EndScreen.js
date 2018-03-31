import React from 'react'

const style = {
  display: 'flex',
  height: '100%',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

export default function () {
  return (
    <div style={style}>
      <p>You finished all the passwords! Thank you for your participation</p>
      <p>Please click on the following link to finish our questionnaire</p>
    </div>
  )
}
