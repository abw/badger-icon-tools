import { test, expect } from 'vitest'
import { POLYLINE, optimisePolyline } from '@/lib/index.js'

test(
  'optimise polyline',
  () => expect(
    optimisePolyline({ points: '100,200 300,400' })
  ).toEqual(
    'polyline:100,200 300,400'
  )
)

test(
  'optimise polyline with class',
  () => expect(
    optimisePolyline({ points: '100,200 300,400', class: 'foo' })
  ).toEqual(
    'polyline.foo:100,200 300,400'
  )
)

test(
  'optimise polyline with fill currentColor',
  () => expect(
    optimisePolyline({ points: '100,200 300,400', fill: 'currentColor' })
  ).toEqual(
    'polyline-solid:100,200 300,400'
  )
)

test(
  'optimise polyline with style - not optimised',
  () => expect(
    optimisePolyline({ points: '100,200 300,400', style: 'bar' })
  ).toEqual({
    element: POLYLINE,
    points: '100,200 300,400',
    style: 'bar'
  })
)