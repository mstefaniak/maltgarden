import { useRef } from 'react'
import { Image } from 'react-datocms'
import styles from './beer.module.scss'
import useTranslation from 'next-translate/useTranslation'
import { Beer } from '@/lib/types'
import { RoundLink } from '@/components/ui/round-link'

const BeerTailSimple = ({ category, photo, name, style, slug }: Beer) => {
  const { t } = useTranslation()
  const beerURL = `/beers/${category.slug}/${slug}`
  const imgContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.outerWrapper}>
      <div className={`${styles.wrapper} ${styles.simpleWrapper}`}>
        <div className={styles.photoWrapper}>
          <div className={styles.photo} ref={imgContainerRef}>
            <Image data={photo.responsiveImage} />
          </div>
        </div>
        <div className={styles.simpleDetails}>
          <div className={styles.name}>{name}</div>
          <div className={styles.style}>{style}</div>
          <div className={styles.simpleLink}>
            <RoundLink href={beerURL} text={t('common:more')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export { BeerTailSimple }
