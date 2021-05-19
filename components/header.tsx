import Link from 'next/link'
import Image from 'next/image'
import { isMobile } from 'react-device-detect'
import { LangSwitch } from './lang-switch'
import { NavButton } from './nav-button'
import { Nav } from './nav'
import styles from './layout.module.scss'
import { NavProvider } from '@/context/nav-context'

const Header = () => {
  return (
    <NavProvider>
      <header className={styles.header}>
        <Nav />
        <Link href="/">
          <a className={styles.headerImage}>
            <Image
              src="/images/logo.svg"
              alt="Maltgarden Brewery Logo"
              layout="fill"
            />
          </a>
        </Link>
        {isMobile && <NavButton />}
        {!isMobile && (
          <div className={styles.langSwitchBox}>
            <LangSwitch />
          </div>
        )}
      </header>
    </NavProvider>
  )
}

export { Header }
