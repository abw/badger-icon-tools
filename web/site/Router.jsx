import React from 'react'
import Layout from './Layout.jsx'
import { createBrowserRouter } from 'react-router-dom'

// Read all the pages/* files and create React Router routes for them.
const matchLayout = /\/_layout$/
const matchIgnore = /\/_examples\//
const routes = buildRoutes(
  import.meta.globEager('../pages/**/[a-z_]*.jsx')
)

function buildRoutes(pages) {
  const routes = Object
    .entries(pages)
    .map(buildRoute)

  // build a lookup table from path to route
  const paths = routes
    .filter(
      route => ! route.path.match(matchIgnore)
    )
    .reduce(
      (paths, route) => {
        paths[route.path] = route
        return paths
      },
      { }
    )
  // console.log(`paths after ignore:`, paths)


  // find all the paths that end in /_layout
  const layoutPaths = Object
    .keys(paths)
    .filter(
      path => path.match(matchLayout)
    )
    .sort(
      (a, b) => b.length - a.length
    )

  // process each layout path
  for (let layoutPath of layoutPaths) {
    const layout = paths[layoutPath]
    delete paths[layoutPath]
    const base  = layoutPath.replace(/_layout$/, '')
    const blen  = base.length
    layout.path = base
    layout.children = [ ]

    // look for an index page in the directory with layout
    const index = paths[base]
    if (index) {
      delete index.path
      index.index = true
      layout.children.push(index)
      delete paths[base]
    }

    // find all the paths under the same directory
    const children = Object
      .keys(paths)
      .filter(
        path => path.slice(0, blen) === base
      )

    // console.log(`children of ${base}: `, children)
    // add child routes to the layout route
    for (let child of children) {
      const route = paths[child]
      delete paths[child]
      child = child.slice(blen)
      // console.log(`- child of ${base}: ${route.path}  => ${child}`)
      route.path = child.length ? child : '/'
      layout.children.push(route)
    }
    // add the layout page as the new page for the base directory
    // console.log(`inserting new ${base} page as layout`)
    paths[base] = layout
  }

  return Object.values(paths)
}

function buildRoute([route, module]) {
  const path = route
    .replace(/^[./]*pages/, '')
    .replace(/\.jsx$/, '')
    .replace(/index$/, '')
    .replace(/\[(\w+)\]/, ':$1')
  const Component = module.default
  // console.log(`${route} => ${path}`)
  return { path, Component }
}


const Router = createBrowserRouter(
  [
    {
      path:     '/',
      element:  <Layout/>,
      children: routes
    },
  ],
  {
    basename: import.meta.env.BASE_URL
  }
)

export default Router
