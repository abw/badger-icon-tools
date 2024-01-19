import { test, expect } from 'vitest'
import { iconify } from '@/lib/index.js'

const MDI  = 'mdi'
const HOME = 'home'
const file = await iconify.svgCacheFile(MDI, HOME)

if (await file.exists()) {
  await file.delete()
}

test(
  'SVG icon',
  async () => {
    const svg = await iconify.iconSvg(MDI, HOME)
    expect(svg)
      .toMatch(
        /path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12/
      )
  }
)

test(
  'SVG icon cache file should exist',
  async () => {
    const file = await iconify.svgCacheFile(MDI, HOME)
    expect(await file.exists())
      .toBe(true)
  }
)

test(
  'SVG icon should come from cache',
  async () => {
    const svg = await iconify.iconSvg(MDI, HOME)
    expect(svg)
      .toMatch(
        /path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12/
      )
  }
)
