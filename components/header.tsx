import Link from 'next/link'
import Image from 'next/image'
import { LangSwitch } from './lang-switch'
import { NavButton } from './nav-button'
import { Nav } from './nav'
import styles from './layout.module.css'
import { NavProvider } from '@/context/nav-context'

const Header = () => {
  return (
    <NavProvider>
      <header className={styles.header}>
        <NavButton />
        <Nav />
        <Link href="/">
          <a>
            <Image
              src="/images/logo.png"
              alt="Maltgarden Logo"
              width={100}
              height={100}
            />
          </a>
        </Link>
        <LangSwitch />
      </header>
    </NavProvider>
  )
}

export { Header }
