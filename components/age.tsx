import Image from 'next/image'
import { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { RoundLink } from '@/components/ui/round-link'
import cn from 'classnames'
import styles from './age.module.css'

interface AgeProps {
  isOpen: boolean
  onVerify: () => void
}

const LOADING_TIME = 1000

const Age = ({ onVerify, isOpen = true }: AgeProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, LOADING_TIME)
  }, [])

  return (
    <div
      className={cn(styles.container, {
        [styles.isOpen]: isOpen,
        [styles.isLoaded]: isLoaded,
      })}
    >
      {isOpen && (
        <>
          <div className={styles.bgImage}>
            <Image
              src="/images/age_check_bg.png"
              alt="Colorful waves in the background"
              layout="fill"
            />
          </div>
          <div className={styles.content}>
            <p>{t('home:ageInfo1')}</p>
            <h1 className={styles.heading}>{t('home:ageInfo2')}</h1>
            <div className={styles.actions}>
              <RoundLink onClick={onVerify} href="" text={t('home:yes')} />
              <RoundLink
                href="http://google.com"
                rel="noindex nofollow"
                text={t('home:no')}
              />
            </div>
            <div className={styles.logoImage}>
              <Image
                src="/images/logo.svg"
                alt="Maltgarden Brewery Logo"
                width={285}
                height={205}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export { Age }
