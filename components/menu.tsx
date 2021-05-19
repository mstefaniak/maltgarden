import { useContext } from 'react'
import { NavContext } from '@/context/nav-context'
import { MobileView } from 'react-device-detect'
import { POSTS_PER_PAGE } from '@/lib/constants'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LangSwitch } from './lang-switch'
import styles from './nav.module.scss'

const Menu = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { setIsOpen } = useContext(NavContext)

  return (
    <div className={styles.menu}>
      <ul>
        <li
          className={!!router.pathname.match(/\/beers\//i) ? styles.active : ''}
        >
          <Link href="/beers/newest">
            <a onClick={() => setIsOpen(false)}>{t('common:nav_beers')}</a>
          </Link>
        </li>
        <li className={router.pathname === '/about' ? styles.active : ''}>
          <Link href="/about">
            <a onClick={() => setIsOpen(false)}>{t('common:nav_about')}</a>
          </Link>
        </li>
        <li
          className={!!router.pathname.match(/\/news\//i) ? styles.active : ''}
        >
          <Link href={`/news/0/${POSTS_PER_PAGE}`}>
            <a onClick={() => setIsOpen(false)}>{t('common:nav_news')}</a>
          </Link>
        </li>
        <li
          className={router.pathname === '/beer-and-food' ? styles.active : ''}
        >
          <Link href="/beer-and-food">
            <a onClick={() => setIsOpen(false)}>{t('common:nav_food')}</a>
          </Link>
        </li>
        <MobileView>
          <li className={styles.spaceTop}>
            <Link href="/newsletter">
              <a onClick={() => setIsOpen(false)}>
                {t('common:nav_newsletter')}
              </a>
            </Link>
          </li>
          <li>
            <LangSwitch />
          </li>
        </MobileView>
      </ul>
    </div>
  )
}

export { Menu }
