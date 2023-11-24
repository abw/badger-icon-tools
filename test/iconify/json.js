import { test, expect } from 'vitest'
import { iconify } from '@/lib/index.js'

const MDI   = 'mdi'
const ICONS = 'home account'
const file  = await iconify.svgCacheFile(MDI, ICONS)

if (await file.exists()) {
  await file.delete()
}

test(
  'JSON icons',
  async () => {
    const json = await iconify.iconsJson(MDI, ICONS)
    expect(json.prefix).toBe('mdi')
    expect(json.width).toBe(24)
    expect(json.height).toBe(24)
    expect(json.icons.account.body)
      .toBe(
        '<path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/>'
      )
    expect(json.icons.home.body)
      .toBe(
        '<path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z"/>'
      )
  }
)

test(
  'JSON icons cache file should exist',
  async () => {
    const file = await iconify.jsonCacheFile(MDI, ICONS)
    expect(await file.exists()).toBe(true)
  }
)

test(
  'JSON icons should come from cache',
  async () => {
    const json = await iconify.iconsJson(MDI, ICONS)
    expect(json.prefix).toBe('mdi')
    expect(json.width).toBe(24)
    expect(json.height).toBe(24)
    expect(json.icons.account.body)
      .toBe(
        '<path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/>'
      )
    expect(json.icons.home.body)
      .toBe(
        '<path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z"/>'
      )
  }
)
