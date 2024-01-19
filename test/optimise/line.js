import { test, expect } from 'vitest'
import { LINE, optimiseLine } from '@/lib/index.js'

test(
  'optimise line',
  () => expect(
    optimiseLine({ x1: 100, y1: 200, x2: 50, y2: 40 })
  ).toEqual(
    'line:100 200 50 40'
  )
)

test(
  'optimise line with defaults',
  () => expect(
    optimiseLine({ })
  ).toEqual(
    'line:0 0 0 0'
  )
)

test(
  'optimise line with class',
  () => expect(
    optimiseLine({ x1: 100, y1: 200, x2: 50, y2: 40, class: 'foo' })
  ).toEqual(
    'line.foo:100 200 50 40'
  )
)

test(
  'optimise line with fill currentColor',
  () => expect(
    optimiseLine({ x1: 100, y1: 200, x2: 50, y2: 40, fill: 'currentColor' })
  ).toEqual(
    'line-solid:100 200 50 40'
  )
)

test(
  'optimise line with style - not optimised',
  () => expect(
    optimiseLine({ x1: 100, y1: 200, x2: 50, y2: 40, style: 'bar' })
  ).toEqual({
    element: LINE,
    x1: 100,
    y1: 200,
    x2: 50,
    y2: 40,
    style: 'bar'
  })
)