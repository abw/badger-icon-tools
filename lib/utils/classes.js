import { hasValue } from '@abw/badger-utils'

export const joinClasses = classes =>
  classes
    .filter(hasValue)
    .join(' ')
