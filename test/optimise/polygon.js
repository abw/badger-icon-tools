import { test, expect } from 'vitest'
import { POLYGON, optimisePolygon } from '@/lib/index.js'

test(
  'optimise polygon',
  () => expect(
    optimisePolygon({ points: '100,200 300,400' })
  ).toEqual(
    'polygon:100,200 300,400'
  )
)

test(
  'optimise polygon with class',
  () => expect(
    optimisePolygon({ points: '100,200 300,400', class: 'foo' })
  ).toEqual(
    'polygon.foo:100,200 300,400'
  )
)

test(
  'optimise polygon with style - not optimised',
  () => expect(
    optimisePolygon({ points: '100,200 300,400', style: 'bar' })
  ).toEqual({
    element: POLYGON,
    points: '100,200 300,400',
    style: 'bar'
  })
)