import { Generator } from '@abw/react-context'
import SiteContext from '@/site/Context.jsx'

const Context = ({addToc, tocName, render}) => {
  const addPageToc = (key, value, ref) => {
    addToc(tocName, key, value, ref)
  }
  return render({
    addPageToc
  })
}

export default Generator(
  SiteContext.Consumer(Context)
)