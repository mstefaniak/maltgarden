import { useState } from 'react'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import styles from './heading.module.scss'

const Heading = () => {
  const [isReady, setIsReady] = useState(false)
  const { t } = useTranslation()

  return (
    <section className={styles.container}>
      <Image
        className={`
          ${styles.bgImage}
          ${isReady ? styles.ready : ''}
        `}
        src="/images/heading.png"
        alt={`${t('common:home_slogan1')} ${t('common:home_slogan2')}`}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        onLoad={() => setIsReady(true)}
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
