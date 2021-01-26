import useTranslation from 'next-translate/useTranslation'
import styles from './layout.module.css'

const Copyright = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.copyright}>
      <div>
        <span>{t('common:footerBuildBy')}</span>{' '}
        <a
          href="https://github.com/mstefaniak"
          rel="noopener noreferrer"
          target="_blank"
        >
          mstefaniak
        </a>
      </div>
    </div>
  )
}

export { Copyright }
