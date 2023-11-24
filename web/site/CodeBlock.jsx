import React from 'react'
import { useState } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import { sleep } from '@abw/badger-utils'

SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('scss', scss)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('yaml', yaml)

export const CodeBlock = ({
  code,
  language='jsx',
  caption,
  expand=false,
  fixed=expand,
  className='',
  undent=false
}) => {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(expand)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    sleep(2000).then(() => setCopied(false))
  }

  return (
    <div className={`codeblock ${className} ${expanded ? 'expanded' : ''} ${fixed ? 'fixed-open' : 'expandable'}`}>
      {Boolean(caption) && <h4 className="caption">{caption}</h4>}
      <div className="controls">
        <div className="expand" onClick={() => setExpanded(! expanded)}>
          { expanded ? 'Compress' : 'Expand' }
        </div>
        <div
          className={`clipboard ${copied ? 'copied' : ''}`}
          onClick={copy}
        >
          { copied ? 'Copied' : 'Copy' }
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        showLineNumbers={true}
        useInlineStyles={false}
        customStyle={{
          // paddingBottom: fixed ? '1rem' : '2rem',
          // backgroundColor: isDark ? '#14191B' : '#292C2D'
        }}
      >
        {prepareCode(code, { undent })}
      </SyntaxHighlighter>
    </div>
  )
}

export const prepareCode = (code, options={}) => {
  // This is some hackery to allow us to display source code fragments.
  // We want the components to be valid JSX and executable so we can display
  // the output of running them.  But we also want to present a cleaner view
  // in the source code.  For example, we have to change the import path,
  // from e.g. '../../src/index.js' to '@abw/badger-react-ui'
  code = code
    // remove everything up to {/* START */}
    .replace(/^[^]*?{?\/\*\s*START\s*\*\/}?\n/, '')
    // and everything from {/* END */} onwards
    .replace(/[\n\s]*{?\/\*\s*END\s*\*\/}?[^]*/, '')
    // and the // PRETEND: prefix
    .replaceAll(/\/\/\s*PRETEND:\s/g, '')
    // also cleanup {/* PRETEND: some stuff */}
    .replaceAll(/{?\/\*\s*PRETEND:\s(.*?)\s+\*\/}?/g, '$1')
    // .replaceAll(/\/\*\s*REAL\s*\*\/.*?\/\*\s*UNREAL\s*\*\//g, '')
    // .replaceAll(/{\/\*\s*(UN?)PRETEND\s*\*\/}/g, '')
    .replace(/\n+$/, '')
    // .replaceAll(/*REAL:\s*\n.*?\n/g, '')       // and any line after // REAL:
  if (options.undent) {
    const match = new RegExp('^' + ' '.repeat(options.undent), 'gm')
    code = code.replaceAll(match, '')
  }
  return code
}


export default CodeBlock
