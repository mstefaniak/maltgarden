import styles from './layout.module.scss'
import { Copyright } from './copyright'
import { Footer } from './footer'
import { MetaStatic } from './meta-static'
import { Alert } from './alert'
import { Header } from './header'
import { Age } from '@/components/age'
import { useAgeVerify } from '@/hooks/age-verify'

type LayoutProps = {
  children: JSX.Element | Array<JSX.Element>
  preview?: boolean
  backgroundColor?: 'beige' | 'blue'
  heading?: JSX.Element
}

const Layout = ({
  children,
  preview = false,
  backgroundColor = 'beige',
  heading,
}: LayoutProps) => {
  const { verified, setVerified } = useAgeVerify()

  return (
    <div className={`${backgroundColor === 'blue' ? styles.bgBlue : ''}`}>
      <MetaStatic />
      <Age onVerify={setVerified} isOpen={!verified} />
      <Alert preview={preview} />
      <Header />
      {heading}
      <main className={styles.main}>{children}</main>
      <Footer />
      <Copyright />
    </div>
  )
}

export { Layout }
