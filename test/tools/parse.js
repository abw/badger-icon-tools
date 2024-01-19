import { test, expect } from 'vitest'
import { parseSVG } from '@/lib/index.js'

test(
  'parse path',
  () => expect(
    parseSVG('<svg viewBox="0 0 420 400"><path d="M100 200L300 400"/></svg>')
  ).toEqual({
    body: 'path:M100 200L300 400',
    height: 400,
    width: 420,
    x: 0,
    y: 0
  }
  )
)

test(
  'parse solid path',
  () => expect(
    parseSVG('<svg viewBox="0 0 420 400"><path fill="currentColor" d="M100 200L300 400"/></svg>')
  ).toEqual({
    body: 'path-solid:M100 200L300 400',
    height: 400,
    width: 420,
    x: 0,
    y: 0,
  }
  )
)
