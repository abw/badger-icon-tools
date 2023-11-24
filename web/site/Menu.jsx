import React from 'react'
import Link from '../ui/Link.jsx'
import Context from './Context.jsx'
import MenuTOC from './MenuTOC.jsx'
import { useResolvedPath } from 'react-router-dom'

const Menu = ({title, path, items, tocs}) => {
  const resolved = useResolvedPath()
  const open = path &&
    ( resolved.pathname === path ||
      resolved.pathname.slice(0, path.length + 1) === `${path}/` )

  return (
    <details className="menu" open={open}>
      <summary>{title}</summary>
      <ul>
        { items.map(
          item => {
            const active = resolved.pathname === item.to
            item.text ||= <span className="font-mono">{item.code}</span>
            return (
              <li key={item.to}>
                <Link className="item" {...item}/>
                { (Boolean(item.tocName) && active && tocs[item.tocName]) &&
                  <MenuTOC toc={tocs[item.tocName]}/>
                }
              </li>
            )
          }
        )}
      </ul>
    </details>
  )
}

export default Context.Consumer(Menu)