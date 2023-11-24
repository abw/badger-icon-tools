import React from 'react'
import Context from './Context.jsx'

export const MenuTOC = ({toc, contentRef}) =>
  <ul className="toc">
    { Object.entries(toc).map(
      ([id, item]) =>
        <li
          key={id}
          onClick={
            () => {
              contentRef.current?.scrollTo({
                top: item.ref.current?.offsetTop - 20,
                // behavior: 'smooth'
              })
            }
          }
        >
          { item.text.match(/^code:/)
            ? <code>{item.text.replace(/^code:/, '')}</code>
            : item.text
          }
        </li>
    )}
  </ul>

export default Context.Consumer(MenuTOC)