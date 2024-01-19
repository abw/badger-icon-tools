import { test, expect } from 'vitest'
import { RECT, optimiseRect } from '@/lib/index.js'

test(
  'optimise rect',
  () => expect(
    optimiseRect({ x: 100, y: 200, width: 50, height: 40 })
  ).toEqual(
    'rect:100 200 50 40'
  )
)

test(
  'optimise rect with rx and ry',
  () => expect(
    optimiseRect({ x: 100, y: 200, width: 50, height: 40, rx: 5, ry: 10 })
  ).toEqual(
    'rect:100 200 50 40 5 10'
  )
)

test(
  'optimise rect with just rx',
  () => expect(
    optimiseRect({ x: 100, y: 200, width: 50, height: 40, rx: 5 })
  ).toEqual(
    'rect:100 200 50 40 5 5'
  )
)

test(
  'optimise rect with just ry',
  () => expect(
    optimiseRect({ x: 100, y: 200, width: 50, height: 40, ry: 5 })
  ).toEqual(
    'rect:100 200 50 40 5 5'
  )
)

test(
  'optimise rect with defaults',
  () => expect(
    optimiseRect({ })
  ).toEqual(
    'rect:0 0 0 0'
  )
)

test(
  'optimise rect with class',
  () => expect(
    optimiseRect({ x: 100, y: 200, width: 50, height: 40, class: 'foo' })
  ).toEqual(
    'rect.foo:100 200 50 40'
  )
)

test(
  'optimise rect with fill currentColor',
  () => expect(
    optimiseRect({ x: 100, y: 200, width: 50, height: 40, fill: 'currentColor' })
  ).toEqual(
    'rect-solid:100 200 50 40'
  )
)

test(
  'optimise rect with style - not optimised',
  () => expect(
    optimiseRect({ x: 100, y: 200, width: 50, height: 40, style: 'bar' })
  ).toStrictEqual({
    element: RECT,
    x: 100,
    y: 200,
    width: 50,
    height: 40,
    style: 'bar'
  })
)

test(
  'optimise rect with style and rx, ry - not optimised',
  () => expect(
    optimiseRect({ x: 100, y: 200, width: 50, height: 40, rx: 10, ry: 15, style: 'bar' })
  ).toStrictEqual({
    element: RECT,
    x: 100,
    y: 200,
    width: 50,
    height: 40,
    rx: 10,
    ry: 15,
    style: 'bar'
  })
)