import { test, expect } from 'vitest'
import { optimisePath } from '@/lib/index.js'

test(
  'optimise path',
  () => expect(
    optimisePath({ d: 'M100 200L300 400' })
  ).toEqual(
    'path:M100 200L300 400'
  )
)

test(
  'optimise path with class',
  () => expect(
    optimisePath({ d: 'M100 200L300 400', class: 'wibble' })
  ).toEqual(
    'path.wibble:M100 200L300 400'
  )
)

test(
  'optimise path with style - not optimised',
  () => expect(
    optimisePath({ d: 'M100 200L300 400', style: 'wibble' })
  ).toEqual({
    element: 'path',
    d: 'M100 200L300 400',
    style: 'wibble'
  })
)