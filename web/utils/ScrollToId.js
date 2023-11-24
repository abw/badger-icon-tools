export default function ScrollToId(
  id,
  opts={ behavior: 'smooth' }
) {
  document.getElementById(id)?.scrollIntoView(opts)
}

