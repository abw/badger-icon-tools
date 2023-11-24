import React from 'react'
import Section from './Section.jsx'
import Example from '@/site/Example.jsx'

const ExampleSection = ({
  Component,
  Source,
  children,
  code,
  title,
  caption=code ? <code>{code}</code> : title,
  expand,
  undent,
  ...props
}) =>
  <Section code={code} title={title} {...props}>
    {children}
    <Example
      Component={Component}
      code={Source}
      caption={caption}
      expand={expand}
      undent={undent}
    />
  </Section>

export default ExampleSection