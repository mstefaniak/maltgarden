import styles from './layout.module.scss'
import { Copyright } from './copyright'
import { Footer } from './footer'
import { MetaStatic } from './meta-static'
import { Alert } from './alert'
import { Header } from './header'
import { Age } from '@/components/age'
import { Heading } from '@/components/ui/heading'
import { useAgeVerify } from '@/hooks/age-verify'

type LayoutProps = {
  children: JSX.Element | Array<JSX.Element>
  preview?: boolean
  isHomePage?: boolean
}

const Layout = ({
  children,
  preview = false,
  isHomePage = false,
}: LayoutProps) => {
  const { verified, setVerified } = useAgeVerify()

  return (
    <div className={styles.container}>
      <MetaStatic />
      <Age onVerify={setVerified} isOpen={!verified} />
      <Alert preview={preview} />
      <Header />
      {isHomePage && <Heading />}
      <main className={styles.main}>{children}</main>
      <Footer />
      <Copyright />
    </div>
  )
}

export { Layout }
