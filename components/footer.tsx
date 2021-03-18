import { Menu } from './menu'
import {
  EMAIL,
  FB_URL,
  UNTAPPD_URL,
  INSTAGRAM_URL,
  PHONE,
} from '@/lib/constants'
import useTranslation from 'next-translate/useTranslation'
import styles from './layout.module.scss'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <section className={styles.footerNotes}>
        <p>2021 &copy; Maltgarden</p>
        <p>
          <span>Email</span> <a href={`mailto: ${EMAIL}`}>{EMAIL}</a>
        </p>
        <p>
          <span>{t('common:phone')}</span> {PHONE}
        </p>
        <p>
          <span>{t('common:followUs')}</span>
          <a href={FB_URL} rel="external noindex nofollow">
            FB
          </a>
          <a href={UNTAPPD_URL} rel="external noindex nofollow">
            UT
          </a>
          <a href={INSTAGRAM_URL} rel="external noindex nofollow">
            IG
          </a>
        </p>
      </section>
      <section className={styles.footerMenu}>
        <Menu />
      </section>
    </footer>
  )
}

export { Footer }
