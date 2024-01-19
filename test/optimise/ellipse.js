import { test, expect } from 'vitest'
import { ELLIPSE, optimiseEllipse } from '@/lib/index.js'

test(
  'optimise ellipse',
  () => expect(
    optimiseEllipse({ cx: 100, cy: 200, rx: 50, ry: 40 })
  ).toEqual(
    'ellipse:100 200 50 40'
  )
)

test(
  'optimise ellipse with class',
  () => expect(
    optimiseEllipse({ cx: 100, cy: 200, rx: 50, ry: 40, class: 'foo' })
  ).toEqual(
    'ellipse.foo:100 200 50 40'
  )
)

test(
  'optimise ellipse with fill currentColor',
  () => expect(
    optimiseEllipse({ cx: 100, cy: 200, rx: 50, ry: 40, fill: 'currentColor' })
  ).toEqual(
    'ellipse-solid:100 200 50 40'
  )
)

test(
  'optimise ellipse with style - not optimised',
  () => expect(
    optimiseEllipse({ cx: 100, cy: 200, rx: 50, ry: 40, style: 'bar' })
  ).toEqual({
    element: ELLIPSE,
    cx: 100,
    cy: 200,
    rx: 50,
    ry: 40,
    style: 'bar'
  })
)