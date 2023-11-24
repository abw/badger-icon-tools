import { test, expect } from 'vitest'
import { Iconify, iconify, ICONIFY_API } from '@/lib/index.js'

test(
  'SVG url with no options',
  () => expect(
    iconify.svgUrl('foo', 'bar')
  ).toEqual(
    `${ICONIFY_API}/foo/bar.svg`
  )
)

test(
  'SVG url with width option',
  () => expect(
    iconify.svgUrl('foo', 'bar', { width: 16 })
  ).toEqual(
    `${ICONIFY_API}/foo/bar.svg?width=16`
  )
)

test(
  'JSON url with names string',
  () => expect(
    iconify.jsonUrl('foo', 'bar baz ant cat')
  ).toEqual(
    `${ICONIFY_API}/foo.json?icons=` + encodeURIComponent('ant,bar,baz,cat')
  )
)

test(
  'JSON url with names array',
  () => expect(
    iconify.jsonUrl('foo', ['bar', 'baz', 'ant', 'cat'])
  ).toEqual(
    `${ICONIFY_API}/foo.json?icons=` + encodeURIComponent('ant,bar,baz,cat')
  )
)

test(
  'apiUrl option',
  () => expect(
    new Iconify({ apiUrl: 'https://somewhere-else.com' })
      .jsonUrl('foo', ['bar', 'baz', 'ant', 'cat'])
  ).toEqual(
    `https://somewhere-else.com/foo.json?icons=` + encodeURIComponent('ant,bar,baz,cat')
  )
)