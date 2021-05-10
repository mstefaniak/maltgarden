import useTranslation from 'next-translate/useTranslation'
import styles from './layout.module.scss'

const Copyright = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.copyright}>
      <span>{t('common:footerBuildBy')}</span>{' '}
      <a
        href="https://github.com/mstefaniak"
        rel="noindex nofollow noopener noreferrer"
        target="_blank"
      >
        mstefaniak
      </a>
    </div>
  )
}

export { Copyright }
