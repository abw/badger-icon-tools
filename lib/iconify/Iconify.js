import { fail, splitList } from '@abw/badger-utils'
import { ICONIFY_API, ICONIFY_CACHE_DIR } from '../constants.js'
import { addDebug } from '@abw/badger'
import { dir } from '@abw/badger-filesystem'
import { codec } from '@abw/badger-codecs'
import crypto from 'node:crypto'
import { apiError } from '../utils/api-error.js'

const defaults = {
  apiUrl:       ICONIFY_API,
  cacheDir:     ICONIFY_CACHE_DIR,
  debugPrefix:  'Iconify > ',
  debugColor:   'bright blue',
}

export class Iconify {
  constructor(options={}) {
    const config = this.config = {
      ...defaults,
      ...options
    }
    this.json = codec('json')
    addDebug(
      this,
      config.debug,
      config.debugPrefix,
      config.debugColor
    )
  }

  async iconSvg(prefix, name, params) {
    const cacheFile = await this.svgCacheFile(prefix, name, params)
    if (cacheFile && await cacheFile.exists()) {
      this.debug(`Returning cached data from ${cacheFile}`)
      return await cacheFile.read()
    }
    return this.fetchSvg(prefix, name, params)
      .then(
        text => {
          return cacheFile
            ? cacheFile
              .write(text)
              .then(() => text)
            : text
        }
      )
  }

  async iconsJson(prefix, names, params) {
    const cacheFile = await this.jsonCacheFile(prefix, names, params)
    if (cacheFile && await cacheFile.exists()) {
      this.debug(`Returning cached data from ${cacheFile}`)
      return await cacheFile.read()
    }
    return this.fetchJson(prefix, names, params)
      .then(
        json => {
          return cacheFile
            ? cacheFile
              .write(json)
              .then(() => json)
            : json
        }
      )
  }

  //--------------------------------------------------------------------------
  // URL construction
  //--------------------------------------------------------------------------
  url(base, params={}) {
    const query  = Object.keys(params).length
      ? `?${new URLSearchParams(params)}`
      : ''
    return `${this.config.apiUrl}/${base}${query}`
  }

  svgUrl(prefix, name, params) {
    return this.url(`${prefix}/${name}.svg`, params)
  }

  jsonUrl(prefix, names, params={}) {
    params.icons = this.iconNames(names)
    return this.url(`${prefix}.json`, params)
  }

  iconNames(names, joint=',') {
    return splitList(names).sort().join(joint)
  }

  //--------------------------------------------------------------------------
  // Fetch requests
  //--------------------------------------------------------------------------
  async fetchSvg(prefix, name, params) {
    const url = this.svgUrl(prefix, name, params)
    this.debug(`Fetching ${prefix}:${name} SVG from ${url}`)
    // for some reason the iconify API returns 400/404 responses with an HTTP
    // status of 200 and a body containing '400' or '404'
    return fetch(url)
      .then(
        response => response.ok
          ? response.text()
          : fail(response.status)
      )
      .then(apiError)
  }

  async fetchJson(prefix, names, params) {
    const url = this.jsonUrl(prefix, names, params)
    this.debug(`Fetching ${prefix} JSON from ${url}`)
    return fetch(url)
      .then(
        response => response.ok
          ? response.text()
          : fail(response.status)
      )
      .then(apiError)
      .then(
        text => this.json.decode(text)
      )
  }

  //--------------------------------------------------------------------------
  // Request caching
  //--------------------------------------------------------------------------
  async cacheDir() {
    return this.config.cacheDir
      ? this._cacheDir ||= await this.initCacheDir()
      : null
  }

  async initCacheDir() {
    const cacheDir = dir(this.config.cacheDir)
    this.debug(`using cache dir: ${cacheDir}`)
    await cacheDir.mustExist({ create: true })
    return cacheDir
  }

  async cacheFile(name, options) {
    const cacheDir = await this.cacheDir()
    return cacheDir
      ? cacheDir.file(name, options)
      : null
  }

  async svgCacheFile(prefix, name, params) {
    return await this.cacheFile(
      this.svgCacheName(prefix, name, params)
    )
  }

  async jsonCacheFile(prefix, names, params) {
    return await this.cacheFile(
      this.jsonCacheName(prefix, names, params),
      { codec: 'json' }
    )
  }

  svgCacheName(prefix, name, params) {
    const p = this.cacheParams(params)
    return `${prefix}-${name}${p}.svg`
  }

  jsonCacheName(prefix, names, params) {
    const n = this.iconNames(names, '_')
    const p = this.cacheParams(params)
    return `${prefix}-${n}${p}.json`
  }

  cacheParams(params) {
    return params
      ? '__' + this.md5Hex(this.json.encode(params))
      : ''
  }

  md5Hex(text) {
    return crypto
      .createHash('md5')
      .update(text)
      .digest('hex')
  }
}

export const iconify = new Iconify()

