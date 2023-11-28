import { brightYellow } from '@abw/badger'

export function expandIconSets(config) {
  const sets   = config.sets  ||  { }
  const icons  = config.icons ||= { }
  const warned = { }

  for (const pair of Object.entries(sets)) {
    const [set, names] = pair
    // console.log(`set ${set} has names: `, names)

    for (const name of names) {
      const match = name.match(/^\s*(.*?)\s+as\s+(.*)/)
      const [source, alias] = match
        ? match.slice(1,3)
        : [name, name]

      if (icons[alias] && ! warned[alias] && ! config.quiet) {
        console.log(
          brightYellow(`WARNING:`),
          `duplicate aliases for "${alias}" icon`
        )
        warned[alias] = true
        continue
      }
      icons[alias] = `${set}:${source}`
    }
  }
}

