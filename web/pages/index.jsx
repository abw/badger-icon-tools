import React from 'react'
import Badger from '@/svg/badger-icon-tools.svg?react'

const Home = () =>
  <div className="container-mobile flow">
    <Badger className="bit-logo mar-t-4"/>
    <h2 className="medium font-mono mar-t-8">NPM: @abw/badger-icon-tools</h2>
    <p className="large">
      This is a set of tools for creating icon libraries for use
      with <a href="https://abw.github.io/badger-icon/">Badger Icon</a>.
    </p>
  </div>

export default Home