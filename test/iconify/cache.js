import { test, expect } from 'vitest'
import { iconify } from '@/lib/index.js'

test(
  'SVG cache file name with no options',
  () => expect(
    iconify.svgCacheName('foo', 'bar')
  ).toEqual(
    `foo-bar.svg`
  )
)

test(
  'SVG cache file name with width:16 option',
  () => expect(
    iconify.svgCacheName('foo', 'bar', { width: 16 })
  ).toEqual(
    `foo-bar__3b368e22a7f74d54555a5497afcc97c5.svg`
  )
)

test(
  'SVG cache file name with width:17 option',
  () => expect(
    iconify.svgCacheName('foo', 'bar', { width: 17 })
  ).toEqual(
    `foo-bar__b8693aaa6d5ee97ab18c91e41b50fa0c.svg`
  )
)

test(
  'JSON cache file name with no options',
  () => expect(
    iconify.jsonCacheName('foo', 'bar baz ant')
  ).toEqual(
    `foo-ant_bar_baz.json`
  )
)

test(
  'JSON cache file name with no options',
  () => expect(
    iconify.jsonCacheName('foo', 'bar baz ant', { width: 16 })
  ).toEqual(
    `foo-ant_bar_baz__3b368e22a7f74d54555a5497afcc97c5.json`
  )
)
