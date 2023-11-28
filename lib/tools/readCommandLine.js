import { options } from '@abw/badger'
import { version } from '../metadata.js'

export async function readCommandLine(props={}) {
  return await options({
    name:         'badger-icon-tools.js',
    description:  'Generates a library of SVG icons for use with badger-icon.',
    version,
    yes:          true,
    verbose:      true,
    quiet:        true,
    options: [
      {
        name:     'minimize',
        short:    'm',
        about:    'Minimize library',
      },
      {
        name:     'file',
        short:    'f',
        about:    'Configuration file',
        type:     'text',
        prompt:   'Where is the configuration file?',
        required: true,
        default:  props.file,
      },
      {
        name:     'custom',
        short:    'c',
        about:    'Custom directory',
        type:     'text',
        prompt:   'Where is the directory of custom SVG icons?',
        default:  props.custom,
      },
      {
        name:     'output',
        short:    'o',
        about:    'Output file',
        type:     'text',
        prompt:   'Where should the output file be written?',
        required: true,
        default:  props.output,
      },
    ]
  })
}
