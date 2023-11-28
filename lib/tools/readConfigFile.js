import { file } from '@abw/badger-filesystem'
import { fail } from '@abw/badger-utils'

export async function readConfigFile(path) {
  const match = path.match(/\.(json|yaml)$/i)
    || fail('Configuration file must be .json or .yaml')
  const codec = match[1]
  const cfile = file(path, { codec })
  await cfile.exists() || fail(`Configuration file does not exist: ${cfile.path()}`)
  return await cfile.read()
}

