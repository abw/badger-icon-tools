import { fail, hasValue, splitList } from '@abw/badger-utils'
import { parse } from 'svg-parser'
import { ELEMENT, PATH } from '../constants.js'
import { joinClasses } from '../utils/classes.js'

const optimisers = {
  // path: optimisePath
}

export function parseIcon(data) {
  const { width, height, body } = data
  return parseSVG(
    body.match(/^\s*<svg/i)
      ? body
      : `<svg viewBox="0 0 ${width} ${height}">${body}</svg>`
  )
}

export function parseSVG(svg) {
  const hast = parse(svg)
  const main = hast.children[0]
  const tree = hastToTree(main)
  const [elem, attrs, kids] = tree

  // the root element (hast) should have one child which is an svg element
  if (elem.toLowerCase() !== 'svg') {
    fail(`Not SVG markup: root element is ${elem}`)
  }

  const vbox = attrs.viewBox
    || fail('No viewBox defined for SVG')
  const data = parseViewBox(vbox)
  data.body = kids.length > 1
    ? kids
    : optimiseElement(kids[0])

  // data.body = tree[2]

  // const kids = main.children.map(main)
  // the svg element can have one or many children
  // return hast
  return data
}

export function hastToTree(node) {
  const { type, tagName, properties, children } = node

  if (type !== ELEMENT) {
    return
  }

  const branch = [tagName, properties]
  if (children && children.length) {
    branch.push(
      children
        .map( child => hastToTree(child) )
        .filter(hasValue)
    )
  }
  return branch
}

export function parseViewBox(viewBox) {
  const [x, y, width, height] = splitList(viewBox).map(parseFloat)
  return { x, y, width, height }
}

export function elementIsEmpty(element) {
  element.children?.length == 0
}

export function optimiseElement(element) {
  const [tag, attrs, children] = element
  const optimiser = optimisers[tag.toLowerCase()]
  if (optimiser) {
    return optimiser(attrs)
  }
}

/*
export function optimisePath(attrs) {
  const { d, ...rest } = attrs
  if (Object.keys(rest).length) {
    return {
      ...rest,
      element: PATH,
      d
    }
  }
  return `path:${d}`
}
*/