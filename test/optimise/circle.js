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
  'optimise circle with radius',
  () => expect(
    optimiseCircle({ r: 10 })
  ).toEqual(
    'circle:0 0 10'
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
  'optimise circle with fill currentColor',
  () => expect(
    optimiseCircle({ cx: 100, cy: 200, r: 50, fill: 'currentColor' })
  ).toEqual(
    'circle-solid:100 200 50'
  )
)

test(
  'optimise circle with fill currentColor and stroke none',
  () => expect(
    optimiseCircle({ cx: 100, cy: 200, r: 50, fill: 'currentColor', stroke: 'none' })
  ).toEqual(
    'circle-solid:100 200 50'
  )
)

test(
  'optimise circle with fill none and stroke currentCOlor',
  () => expect(
    optimiseCircle({ cx: 100, cy: 200, r: 50, stroke: 'currentColor', fill: 'none' })
  ).toEqual(
    'circle-outline:100 200 50'
  )
)

test(
  'optimise circle with both fill and stroke',
  () => expect(
    optimiseCircle({ cx: 100, cy: 200, r: 50, fill: 'red', stroke: 'green' })
  ).toEqual(
    'circle-fill=red-stroke=green:100 200 50'
  )
)

test(
  'optimise circle with opacity',
  () => expect(
    optimiseCircle({ cx: 100, cy: 200, r: 50, opacity: 0.5 })
  ).toEqual(
    'circle-opacity=0.5:100 200 50'
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

