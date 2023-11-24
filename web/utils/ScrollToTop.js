import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(
    () => scroll(document.getElementById('content')),
    [pathname]
  )
  return null
}

export function scroll(
  element,
  {
    top=0,
    left=0,
    behavior='smooth'
  } = { }
) {
  element?.scrollTo({
    top,
    left,
    behavior
  })
}
