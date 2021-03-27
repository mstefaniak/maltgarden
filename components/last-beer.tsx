import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { Beer } from '@/lib/types'
import styles from './last-beer.module.scss'

interface ILastBeerProps {
  beer: Beer
}

const LastBeer = ({ beer }: ILastBeerProps) => {
  const { t } = useTranslation()
  const img = beer.photoWithBackground.responsiveImage
  const bg = beer.backgroundImage.responsiveImage

  return (
    <section className={styles.lastBeer}>
      <div className={styles.background}>
        <Image
          src={bg.src as string}
          alt={bg.alt}
          title={bg.title}
          layout="fill"
        />
      </div>
      <div className={styles.image}>
        <Image
          src={img.src as string}
          alt={img.alt}
          title={img.title}
          width={img.width}
          height={img.height as number}
        />
      </div>
      <div
        className={styles.descriptionBox}
        style={{ backgroundColor: beer.backgroundColor.hex }}
      >
        <h3>{t('home:freshestBrew')}</h3>
        <p>{beer.name}</p>
        <p>{beer.description}</p>
      </div>
    </section>
  )
}

export { LastBeer }
