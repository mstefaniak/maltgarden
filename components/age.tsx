import { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import cn from 'classnames'
import styles from './age.module.css'

interface AgeProps {
  isOpen: boolean,
  onVerify: () => void,
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
    <div className={cn(styles.container, {
          [styles.isOpen]: isOpen,
          [styles.isLoaded]: isLoaded,
        })
      }
    >
      {isOpen &&
        <div className={styles.content}>
          <button
            className={styles.button}
            onClick={onVerify}
          >
            {t('common:ageConfirm')}
          </button>
        </div>
      }
    </div>
  )
}

export { Age }
