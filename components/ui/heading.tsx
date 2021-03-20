import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import styles from './heading.module.scss'

const Heading = () => {
  const { t } = useTranslation()

  return (
    <section className={styles.container}>
      <Image
        className={styles.bgImage}
        src="/images/heading.png"
        alt={`${t('common:home_slogan1')} ${t('common:home_slogan2')}`}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className={styles.content}>
        <h1>
          <span>{t('common:home_slogan1')}</span>
          <span>{t('common:home_slogan2')}</span>
        </h1>
      </div>
    </section>
  )
}

export { Heading }
