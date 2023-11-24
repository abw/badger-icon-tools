#!/usr/bin/env node
import { cmdLineArgs, quit } from '@abw/badger'
import { Iconify } from '../lib/index.js'

const [prefix, name] = await cmdLineArgs([
  'Icon prefix',
  'Icon name'
]) || quit('Prefix and/or name not provided')

const iconify = new Iconify({
  debug: true,
  // apiUrl: 'http://localhost:3000'
})

iconify.fetchSvg(prefix, name)
  .then(
    text => console.log('OK', text)
  )
  .catch(
    error => console.log('ERROR', error.message)
  )
