import { test, expect } from 'vitest'
import { parseSVG } from '@/lib/index.js'

test(
  'parse path',
  () => expect(
    parseSVG('<svg viewBox="0 0 400 400"><path d="M100 200L300 400"/></svg>')
  ).toEqual({
    erm: 'TODO'
  }
  )
)