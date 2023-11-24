import { useRef, useState } from 'react'
import { Generator } from '@abw/react-context'

const Context = ({render}) => {
  const [tocs, setTocs] = useState({ })
  const contentRef = useRef()
  const addToc = (tocName, key, text, ref) => {
    const toc = tocs[tocName] ||= { }
    toc[key] = { text, ref }
    setTocs({ ...tocs })
  }
  return render({
    tocs, addToc, contentRef
  })
}

export default Generator(Context)