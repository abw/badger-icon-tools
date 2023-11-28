import { test, expect } from 'vitest'
import { CIRCLE, optimiseCircle } from '@/lib/index.js'

test(
  'optimise circle',
  () => expect(
    optimiseCircle({ cx: 100, cy: 200, r: 50 })
  ).toEqual(
    'circle:100 200 50'
  )
)

test(
  'optimise circle with defaults',
  () => expect(
    optimiseCircle({ })
  ).toEqual(
    'circle:0 0 0'
  )
)

test(
  'optimise circle with class',
  () => expect(
    optimiseCircle({ cx: 100, cy: 200, r: 50, class: 'foo' })
  ).toEqual(
    'circle.foo:100 200 50'
  )
)

test(
  'optimise circle with style - not optimised',
  () => expect(
    optimiseCircle({ cx: 100, cy: 200, r: 50, style: 'bar' })
  ).toEqual({
    element: CIRCLE,
    cx: 100,
    cy: 200,
    r: 50,
    style: 'bar'
  })
)