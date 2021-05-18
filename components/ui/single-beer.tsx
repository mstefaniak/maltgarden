import { Image } from 'react-datocms'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Beer } from '@/lib/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUntappd } from '@fortawesome/free-brands-svg-icons'

import styles from '@/components/ui/single-beer.module.scss'

const SingleBeer = ({
  alc,
  blg,
  description,
  name,
  style,
  ingredients,
  untappdUrl,
  backgroundColor,
  backgroundImage,
  photoWithBackground,
}: Beer) => {
  const { t } = useTranslation()
  const router = useRouter()
  const handleClose = () => {
    router.back()
  }

  return (
    <>
      <section className={styles.beerWrapper}>
        <div className={styles.background}>
          <Image
            data={backgroundImage.responsiveImage}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
        <div
          className={styles.description}
          style={{ backgroundColor: backgroundColor?.hex ?? 'pink' }}
        >
          <button className={styles.closeButton} onClick={handleClose}>
            X
          </button>
          <h1>{name}</h1>
          <p className={styles.styleName}>{style}</p>
          <p className={styles.smallGap}>
            {t('beer:alc')}: {alc}% / {t('beer:blg')}: {blg}
          </p>
          <p className={styles.smallGap}>
            {t('beer:ingredients')}: {ingredients}
          </p>
          <p>{description}</p>
          {untappdUrl && (
            <div>
              <a
                href={untappdUrl}
                className={styles.untappd}
                rel="nofollow noindex"
                target="_blank"
              >
                <FontAwesomeIcon icon={faUntappd} />
              </a>
            </div>
          )}
        </div>
        <div className={styles.photo}>
          <Image data={photoWithBackground.responsiveImage} lazyLoad={false} />
        </div>
      </section>
      <section>
        <h2>{t('beer:otherInCategory')}</h2>
      </section>
    </>
  )
}

export { SingleBeer }
