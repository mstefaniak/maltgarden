import { isDesktop } from 'react-device-detect'
import { Menu } from './menu'
import {
  EMAIL,
  FB_URL,
  YOUTUBE_URL,
  INSTAGRAM_URL,
  UNTAPPD_URL,
} from '@/lib/constants'
import useTranslation from 'next-translate/useTranslation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './layout.module.scss'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <section className={styles.footerNotes}>
        <p>2022 &copy; Maltgarden</p>
        <p>
          <span>Email</span> <a href={`mailto: ${EMAIL}`}>{EMAIL}</a>
        </p>
        <p>
          <span>{t('common:followUs')}</span>
          <a
            href={FB_URL}
            rel="nofollow noindex"
            target="_blank"
            className={styles.footerIcon}
          >
            <FontAwesomeIcon icon="fa-brands fa-facebook-square" />
          </a>
          <a
            href={UNTAPPD_URL}
            className={styles.footerIcon}
            rel="nofollow noindex"
            target="_blank"
          >
            <FontAwesomeIcon icon="fa-brands fa-untappd" />
          </a>
          <a
            href={INSTAGRAM_URL}
            rel="nofollow noindex"
            target="_blank"
            className={styles.footerIcon}
          >
            <FontAwesomeIcon icon="fa-brands fa-instagram" />
          </a>
        </p>
      </section>
      {isDesktop && (
        <section className={styles.footerMenu}>
          <Menu />
        </section>
      )}
    </footer>
  )
}

export { Footer }
