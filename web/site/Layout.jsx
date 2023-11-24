import React        from 'react'
import Header       from './Header.jsx'
import Footer       from './Footer.jsx'
import Sidebar      from './Sidebar.jsx'
import ScrollToTop  from '@/utils/ScrollToTop.js'
import { Outlet }   from 'react-router-dom'
import { useTheme } from '@abw/react-night-and-day'
import Context from './Context.jsx'

const Layout = ({ contentRef }) => {
  const { theme, variant } = useTheme()
  // const className = `${theme} ${variant}`
  return (
    <div id="site" className={variant} data-theme={theme}>
      <Header/>
      <div id="app">
        <ScrollToTop/>
        <aside>
          <Sidebar/>
        </aside>
        <main id="content" ref={contentRef}>
          <Outlet/>
        </main>
      </div>
      <Footer/>
    </div>
  )
}

export default Context.Consumer(Layout)