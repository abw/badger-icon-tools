#!/usr/bin/env node
import { Iconify } from '../lib/index.js'

const iconify = new Iconify({ debug: true })

const cacheDir = await iconify.cacheDir()

console.log(`cacheDir: ${cacheDir}`)
