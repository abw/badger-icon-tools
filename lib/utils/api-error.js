import { fail } from '@abw/badger-utils'

// for some reason the iconify API returns 400/404 responses with an HTTP
// status of 200 and a body containing '400' or '404'
export const apiError = text => text.match(/^40\d$/)
  ? fail(text)
  : text