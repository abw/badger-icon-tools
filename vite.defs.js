import { now } from '@abw/badger-timestamp'
import process from 'node:process'

const MODULE_VERSION = JSON.stringify(process.env.npm_package_version)
const MODULE_DATE    = JSON.stringify(now().date())

export default {
  MODULE_VERSION,
  MODULE_DATE
}
