import { useContext } from 'react'
import { NavContext } from '@/context/nav-context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LOCALES } from '@/lib/constants'

import styles from './lang-switch.module.scss'

const LangSwitch = () => {
  const router = useRouter()
  const { setIsOpen } = useContext(NavContext)

  return (
    <div className={styles.langSwitch}>
      <Link href={`/${LOCALES.EN}${router.asPath}`} locale="en">
        <a onClick={() => setIsOpen(false)}>EN</a>
      </Link>
      <span className={styles.separator} />
      <Link href={`/${LOCALES.PL}${router.asPath}`} locale="pl">
        <a onClick={() => setIsOpen(false)}>PL</a>
      </Link>
    </div>
  )
}

export { LangSwitch }
