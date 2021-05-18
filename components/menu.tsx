import { POSTS_PER_PAGE } from '@/lib/constants'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './nav.module.scss'

const Menu = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <ul>
      <li
        className={!!router.pathname.match(/\/beers\//i) ? styles.active : ''}
      >
        <Link href="/beers/newest">{t('common:nav_beers')}</Link>
      </li>
      <li className={router.pathname === '/about' ? styles.active : ''}>
        <Link href="/about">{t('common:nav_about')}</Link>
      </li>
      <li className={!!router.pathname.match(/\/news\//i) ? styles.active : ''}>
        <Link href={`/news/0/${POSTS_PER_PAGE}`}>{t('common:nav_news')}</Link>
      </li>
      <li className={router.pathname === '/beer-and-food' ? styles.active : ''}>
        <Link href="/beer-and-food">{t('common:nav_food')}</Link>
      </li>
    </ul>
  )
}

export { Menu }
