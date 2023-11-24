import React          from 'react'
import CodeBlock      from '@/site/CodeBlock.jsx'
import add            from './_examples/add?raw'

const Installation = () =>
  <div className="flow">
    <h1>Installation</h1>

    <h2>Adding to a Javascript Project</h2>
    <p className="cols-2">
      Add <code>@abw/badger-icon-tools</code> to your Javascript project
      using your favourite package manager.  It should usually be added as
      a dev dependency with the <code>-D</code> option.
    </p>
    <CodeBlock
      code={add}
      caption="Installing"
      language="shell"
      className="mar-b-8"
      expand
    />

  </div>

export default Installation