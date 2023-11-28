import { hasValue } from '@abw/badger-utils'
import { CIRCLE, ELLIPSE, LINE, PATH, POLYGON, POLYLINE, RECT } from '../constants.js'

export const optimiseCircle = ({
  cx=0, cy=0, r=0,
  class:cls,
  ...rest
}) =>
  Object.keys(rest).length === 0
    ? `circle${dotClass(cls)}:${cx} ${cy} ${r}`
    : {
        ...rest,
        element: CIRCLE,
        cx, cy, r
      }

export const optimiseEllipse = ({
  cx=0, cy=0, rx=0, ry=rx,
  class:cls,
  ...rest
}) =>
  Object.keys(rest).length === 0
    ? optimalString(ELLIPSE, cls, cx, cy, rx, ry)
    : {
        ...rest,
        element: ELLIPSE,
        cx, cy, rx, ry
      }

export const optimiseLine = ({
  x1=0, y1=0, x2=0, y2=0,
  class:cls,
  ...rest
}) =>
  Object.keys(rest).length === 0
    ? optimalString(LINE, cls, x1, y1, x2, y2)
    : {
        ...rest,
        element: LINE,
        x1, y1, x2, y2
      }

export const optimisePath = ({
  d,
  class:cls,
  ...rest
}) =>
  Object.keys(rest).length === 0
    ? optimalString(PATH, cls, d)
    : {
        ...rest,
        element: PATH,
        d
      }

export const optimisePolygon = ({
  points,
  class:cls,
  ...rest
}) =>
  Object.keys(rest).length === 0
    ? optimalString(POLYGON, cls, points)
    : {
        ...rest,
        element: POLYGON,
        points
      }

export const optimisePolyline = ({
  points,
  class:cls,
  ...rest
}) =>
  Object.keys(rest).length === 0
    ? optimalString(POLYLINE, cls, points)
    : {
        ...rest,
        element: POLYLINE,
        points
      }

export const optimiseRect = ({
  x=0, y=0, width=0, height=0, rx, ry=rx,
  class:cls,
  ...rest
}) =>
  Object.keys(rest).length === 0
    ? optimalString(RECT, cls, x, y, width, height, rx??ry, ry)
    : {
        ...rest,
        element: RECT,
        x, y, width, height,
        ...(hasValue(rx) ? { rx } : { }),
        ...(hasValue(ry) ? { ry } : { }),
      }

export function optimalString(type, cls, ...args) {
  return `${type}${dotClass(cls)}:${args.filter(hasValue).join(' ')}`
}

export function dotClass(cls) {
  return hasValue(cls)
    ? `.${cls}`
    : ''
}

export const optimisers = {
  circle:   optimiseCircle,
  ellipse:  optimiseEllipse,
  line:     optimiseLine,
  path:     optimisePath,
  polygon:  optimisePolygon,
  polyline: optimisePolyline,
}

