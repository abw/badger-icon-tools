import { clusterIcons } from './clusterIcons.js'
import { expandIconSets } from './expandIconSets.js'
import { fetchIcons } from './fetchIcons.js'
// import { inspect } from 'node:util'

export async function buildLibrary(config) {
  // console.log(`TODO: buildLibrary `, config)
  expandIconSets(config)
  clusterIcons(config)
  await fetchIcons(config)
  console.dir(config, { depth: null })

}

