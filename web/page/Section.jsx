import React, { useEffect, useRef } from 'react'
import { idSafe } from '../utils/Misc.js'
import Context from './Context.js'

const Section = ({
  id,
  code,
  title=code,
  children,
  addPageToc
}) => {
  const elemId = idSafe(id || code || title)
  const ref = useRef()
  const tocText = code
    ? `code:${code}`
    : title

  useEffect(
    () => {
      if (addPageToc) {
        addPageToc(elemId, tocText, ref)
      }
    },
    [id, code, title]
  )
  return (
    <section id={elemId} ref={ref}>
      <h2 className={code ? 'font-mono' : ''}>{title}</h2>
      {children}
    </section>
  )
}

export default Context.Consumer(Section)