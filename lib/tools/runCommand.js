import { appStatus, brightRed, quit } from '@abw/badger'
import { readCommandLine } from './readCommandLine.js'
import { readConfigFile } from './readConfigFile.js'

export const runCommand = appStatus(
  async (command, props={}) => {
    const config     = await readCommandLine(props) || quit(brightRed('Cancelled'))
    const configFile = await readConfigFile(config.file)
    await command({ ...config, ...configFile, ...props })
  }
)
