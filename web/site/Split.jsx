import React from 'react'

const Split = ({children, align='top'}) =>
  <div
    className={`grid-2 gap-h-8 stack-desktop ${align}`}
    style={{ '--prose-width': '100%' }}
  >
    {children}
  </div>

export default Split
