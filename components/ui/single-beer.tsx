import { Image } from 'react-datocms'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { Beer } from '@/lib/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUntappd } from '@fortawesome/free-brands-svg-icons'

import styles from '@/components/ui/single-beer.module.scss'

interface ISingleBeerProps {
  beer: Beer
  otherBeers: Beer[]
}

const SingleBeer = ({ beer, otherBeers }: ISingleBeerProps) => {
  const {
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
  } = beer
  const { t } = useTranslation()
  const router = useRouter()
  const handleClose = () => {
    router.back()
  }

  return (
    <div className={styles.beerWrapper}>
      <section className={styles.beerBox}>
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
      <section className={styles.otherBeersBox}>
        <h3>{t('beer:otherInCategory')}</h3>
        <div className={styles.otherBeersList}>
          {otherBeers.map((otherBeer) => (
            <div className={styles.otherBeer}>
              {otherBeer.photoWithBackground && (
                <Image
                  data={otherBeer.photoWithBackground.responsiveImage}
                  lazyLoad={false}
                />
              )}
              <p className={styles.smallGap}>{otherBeer.name}</p>
              <p className={styles.smallGap}>{otherBeer.style}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export { SingleBeer }
