import Link from 'next/link'
import { useRouter } from 'next/router'
import { LOCALES } from '@/lib/constants'

import styles from './lang-switch.module.scss'

const LangSwitch = () => {
  const router = useRouter()

  return (
    <div className={styles.langSwitch}>
      <Link href={`/${LOCALES.EN}${router.asPath}`} locale="en">
        <a>EN</a>
      </Link>
      <span className={styles.separator} />
      <Link href={`/${LOCALES.PL}${router.asPath}`} locale="pl">
        <a>PL</a>
      </Link>
    </div>
  )
}

export { LangSwitch }
