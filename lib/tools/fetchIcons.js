import { brightRed } from '@abw/badger'
import { Iconify } from '../iconify/Iconify.js'

export async function fetchIcons(config) {
  const setIcons = config.setIcons
  const setData  = config.setData = { }
  const iconify  = new Iconify(config)

  for (const pair of Object.entries(setIcons)) {
    const [prefix, names] = pair
    const icons = [...names].join(',')
    try {
      const data = setData[prefix] = await iconify.iconsJson(prefix, icons)
      Object.values(data.icons).forEach(
        icon => {
          icon.width  ??= data.width
          icon.height ??= data.height
        }
      )
      const missing = data.not_found
      if (missing?.length) {
        missing.forEach(
          miss => console.log(
            brightRed('MISSING:'),
            `"${miss}" icon in "${prefix}" set`
          )
        )
      }
    }
    catch (error) {
      console.log(brightRed(`Failed to fetch ${prefix} icons:`), error.message)
      throw(error)
    }
  }
}
