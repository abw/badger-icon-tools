import { hasValue } from '@abw/badger-utils'
import { CIRCLE, CURRENT_COLOR, DASH, ELLIPSE, LINE, NONE, OUTLINE, PATH, POLYGON, POLYLINE, RECT, SOLID } from '../constants.js'

export const optimiseCircle = ({
  cx=0, cy=0, r=0,
  ...rest
}) =>
  optimalString(CIRCLE, rest, cx, cy, r) ?? {
    element: CIRCLE,
    cx, cy, r,
    ...rest
  }

export const optimiseEllipse = ({
  cx=0, cy=0, rx=0, ry=rx,
  ...rest
}) =>
  optimalString(ELLIPSE, rest, cx, cy, rx, ry) ?? {
    element: ELLIPSE,
    cx, cy, rx, ry,
    ...rest
  }

export const optimiseLine = ({
  x1=0, y1=0, x2=0, y2=0,
  ...rest
}) =>
  optimalString(LINE, rest, x1, y1, x2, y2) ?? {
    element: LINE,
    x1, y1, x2, y2,
    ...rest
  }

export const optimisePath = ({
  d,
  ...rest
}) =>
  optimalString(PATH, rest, d) ?? {
    element: PATH,
    d,
    ...rest,
  }

export const optimisePolygon = ({
  points,
  ...rest
}) =>
  optimalString(POLYGON, rest, points) ?? {
    element: POLYGON,
    points,
    ...rest,
  }

export const optimisePolyline = ({
  points,
  ...rest
}) =>
  optimalString(POLYLINE, rest, points) ?? {
    element: POLYLINE,
    points,
    ...rest,
  }

export const optimiseRect = ({
  x=0, y=0, width=0, height=0, rx, ry=rx,
  ...rest
}) =>
  optimalString(RECT, rest, x, y, width, height, rx??ry, ry) ?? {
    element: RECT,
    x, y, width, height,
    ...(hasValue(rx) ? { rx } : { }),
    ...(hasValue(ry) ? { ry } : { }),
    ...rest,
  }

// We can optimise most simple elements as strings, e.g. an SVG element like
// <path d="M1,2L3,4"> will call optimalString('path', { }, 'M1,2L3,4') and
// can be returned as 'path:M1,2L3,4'.  Or <circle cx="10" cy="20" r="30">
// will call optimalString('circle', { }, 10, 20, 30) and can be optimised
// to 'circle:10 20 30'.
//
// We can't do this if there are additional attributes in the element,
// although there are a few special cases that we can optimise for:
//
//   * a 'class' attribute can be attached as a dotted suffix,
//     e.g. optimalString('path', { class: 'foo'}, 'M1,2L3,4')
//     can be returned as 'path.foo:M1,2L3,4'
//
//   * a 'fill' attribute set to 'currentColor' can have a '-solid' suffix,
//     e.g. optimalString('path', { fill: 'currentColor' }, 'M1,2L3,4')
//     can be returned as 'path-solid:M1,2L3,4'.  This only applies if 'stroke'
//     is 'none' or undefined.  Otherwise we add the '-fill=XXX' suffix to
//     apply the fill color.
//
//   * a 'stroke' attribute set to 'currentColor' can have an '-outline'
//     suffix. e.g. optimalString('path', { stroke: 'currentColor' }, 'M1,2L3,4')
//     can be returned as 'path-outline:M1,2L3,4'.  This only applies if 'fill'
//     is 'none' or undefined.  Otherwise we add the '-stroke=XXX' suffix to
//     apply the stroke color.
//
//   * an 'opacity' attribute can be added as an '-opacity=XXX' suffix
//
// If there are any other attributes, or a fill/stroke attributes with
// different values then we can't optimise it as a string.

export function optimalString(type, attrs, ...args) {
  const {
    class:cls,
    fill=NONE,
    stroke=NONE,
    opacity,
    ...rest
  } = attrs
  const suffixes = [ ]

  // can't handle additional attributes
  if (Object.keys(rest).length > 0) {
    return null
  }

  // special case for fill="currentColor"
  if (fill === CURRENT_COLOR && stroke === NONE) {
    suffixes.push(SOLID)
  }
  else if (fill !== NONE) {
    suffixes.push(`fill=${fill}`)
  }

  // special case for stroke="currentColor"
  if (stroke === CURRENT_COLOR && fill === NONE) {
    suffixes.push(OUTLINE)
  }
  else if (stroke !== NONE) {
    suffixes.push(`stroke=${stroke}`)
  }

  if (hasValue(opacity)) {
    suffixes.push(`opacity=${opacity}`)
  }

  return `${type}${dotClass(cls)}${dashSuffixes(suffixes)}:${args.filter(hasValue).join(' ')}`
}

export function dotClass(cls) {
  return hasValue(cls)
    ? `.${cls}`
    : ''
}

export function dashSuffixes(suffixes=[]) {
  return suffixes.length
    ? DASH + suffixes.join(DASH)
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

