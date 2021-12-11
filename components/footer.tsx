import { isDesktop } from 'react-device-detect'
import { Menu } from './menu'
import {
  EMAIL,
  FB_URL,
  YOUTUBE_URL,
  INSTAGRAM_URL,
  PHONE,
} from '@/lib/constants'
import useTranslation from 'next-translate/useTranslation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faYoutube,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons'
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
          <a
            href={FB_URL}
            rel="nofollow noindex"
            target="_blank"
            className={styles.footerIcon}
          >
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>
          <a
            href={YOUTUBE_URL}
            rel="nofollow noindex"
            target="_blank"
            className={styles.footerIcon}
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a
            href={INSTAGRAM_URL}
            rel="nofollow noindex"
            target="_blank"
            className={styles.footerIcon}
          >
            <FontAwesomeIcon icon={faInstagram} />
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
