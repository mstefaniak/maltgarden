import styles from './layout.module.css'
import { Copyright } from './copyright'
import { Footer } from './footer'
import { Meta } from './meta'
import { Alert } from './alert'
import { Header } from './header'
import { Age } from '@/components/age'
import { useAgeVerify } from '@/hooks/age-verify'

type LayoutProps = {
  children: JSX.Element | Array<JSX.Element>
  preview?: boolean
}

const Layout = ({ children, preview = false }: LayoutProps) => {
  const { verified, setVerified } = useAgeVerify()

  return (
    <div className={styles.container}>
      <Meta />
      <Age onVerify={setVerified} isOpen={!verified} />
      <Alert preview={preview} />
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
      <Copyright />
    </div>
  )
}

export { Layout }
