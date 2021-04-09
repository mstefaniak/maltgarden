import { useState } from 'react'
import { Fade } from 'react-awesome-reveal'
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
        onLoad={() => setIsReady(true)}
      />
      <div className={styles.content}>
        <Fade delay={1000} duration={2000} triggerOnce={true}>
          <h1>
            <span>{t('common:home_slogan1')}</span>
            <span>{t('common:home_slogan2')}</span>
          </h1>
        </Fade>
      </div>
    </section>
  )
}

export { Heading }
