import useTranslation from 'next-translate/useTranslation'
import styles from './heading.module.scss'

const Heading = () => {
  const { t } = useTranslation()

  return (
    <section className={styles.slogan}>
      <h1>
        <span>{t('common:home_slogan1')}</span>
        <span>{t('common:home_slogan2')}</span>
      </h1>
    </section>
  )
}

export { Heading }
