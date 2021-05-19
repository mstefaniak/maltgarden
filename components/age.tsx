import { isMobile } from 'react-device-detect'
import Image from 'next/image'
import { Slide } from 'react-awesome-reveal'
import { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { RoundLink } from '@/components/ui/round-link'
import cn from 'classnames'
import styles from './age.module.scss'

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
            {isMobile && (
              <Slide delay={1250} direction="down">
                <div className={styles.logoImage}>
                  <Image
                    src="/images/logo.svg"
                    alt="Maltgarden Brewery Logo"
                    width={145}
                    height={105}
                  />
                </div>
              </Slide>
            )}
            <p>{t('home:ageInfo1')}</p>
            <h1 className={styles.heading}>{t('home:ageInfo2')}</h1>
            <div className={styles.actions}>
              <Slide delay={1000} direction="left">
                <RoundLink onClick={onVerify} href="" text={t('home:yes')} />
              </Slide>
              <Slide delay={1000} direction="right">
                <RoundLink
                  href="http://google.com"
                  rel="noindex nofollow"
                  text={t('home:no')}
                />
              </Slide>
            </div>
            {!isMobile && (
              <Slide delay={1250} direction="up">
                <div className={styles.logoImage}>
                  <Image
                    src="/images/logo.svg"
                    alt="Maltgarden Brewery Logo"
                    width={285}
                    height={205}
                  />
                </div>
              </Slide>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export { Age }
