import type { AppProps } from 'next/app'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faInstagram,
  faFacebookSquare,
  faUntappd,
} from '@fortawesome/free-brands-svg-icons'

import '@/styles/global.scss'

library.add(faInstagram, faFacebookSquare, faUntappd)

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
