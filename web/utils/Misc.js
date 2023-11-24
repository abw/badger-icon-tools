export const idSafe = text =>
  text
    .replaceAll(/\W+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    .toLowerCase()
