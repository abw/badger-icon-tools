import React from 'react'
import Link from '@/ui/Link.jsx'
import { Icon } from '@abw/badger-react-ui'
import { Toggle, useTheme } from '@abw/react-night-and-day'
import { SIDEBAR, NO_SIDEBAR } from './Constants.jsx'
import { VERSION } from './Config.js'

const Header = () => {
  const { variant, setVariant } = useTheme()
  return (
    <header>
      <nav>
        <div>
          <Icon
            name="bars"
            className="toggle-sidebar action"
            onClick={() => setVariant(variant === SIDEBAR ? NO_SIDEBAR : SIDEBAR)}
          />
          <Link to="/" className="home mar-l-2" text="Badger Icon Tools"/>
          <span className="small mar-l-2">v{VERSION}</span>
        </div>
        <div className="flex middle">
          <a href="https://github.com/abw/badger-icon-tools">
            <Icon name="github" className="mar-r-4"/>
          </a>
          <Toggle/>
        </div>
      </nav>
    </header>
  )
}

export default Header
