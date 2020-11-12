import styles from './layout.module.css'
import { Copyright } from './copyright'
import { Footer } from './footer'
import { Meta } from './meta'
import { Alert } from './alert'
import { Header } from './header'

type LayoutProps = {
  children: JSX.Element | Array<JSX.Element>,
  preview?: boolean,
}

const Layout = ({ children, preview = false}: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Meta />
      <Alert preview={preview} />
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
      <Copyright />
    </div>
  )
}

export { Layout }
