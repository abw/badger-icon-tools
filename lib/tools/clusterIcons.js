export function clusterIcons(config) {
  const icons    = config.icons ||= { }
  const setIcons = config.setIcons = { }

  for (let pair of Object.entries(icons)) {
    const [alias, source] = pair
    const [setName, iconName] = icons[alias] = source.split(':', 2)
    const set = setIcons[setName] ||= new Set()
    set.add(iconName)
  }
}

