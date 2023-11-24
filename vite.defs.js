import { now } from '@abw/badger-timestamp'
import process from 'node:process'

const SITE_VERSION = JSON.stringify(process.env.npm_package_version)
const SITE_DATE    = JSON.stringify(now().date())

export default {
  SITE_VERSION,
  SITE_DATE
}
