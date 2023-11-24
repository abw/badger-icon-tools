import React from 'react'
import Context from './Context.js'

const Sections = ({
  tocName,
  children
}) =>
  <Context.Provider tocName={tocName}>
    {children}
  </Context.Provider>

export default Sections