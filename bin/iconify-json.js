#!/usr/bin/env node
import { cmdLineArgs, quit } from '@abw/badger'
import { Iconify } from '../lib/index.js'

const [prefix, names] = await cmdLineArgs([
  'Icon prefix',
  'Icon names'
]) || quit('Prefix and/or names not provided')

const iconify = new Iconify({
  debug: true,
  // apiUrl: 'http://localhost:3000'
})

iconify.iconsJson(prefix, names)
  .then(
    json => console.log(json)
  )
  .catch(
    error => console.log('ERROR', error.message)
  )
