
import styles from './layout.module.css'
import { Footer } from './footer'
import { Meta } from './meta'
import { Alert } from './alert'

type LayoutProps = {
  children: JSX.Element | Array<JSX.Element>,
  preview?: boolean,
}

const Layout = ({ children, preview = false}: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Meta />
      <div>
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export { Layout }
