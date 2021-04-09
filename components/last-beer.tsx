import { Slide } from 'react-awesome-reveal'
import { Image } from 'react-datocms'
import useTranslation from 'next-translate/useTranslation'
import { Beer } from '@/lib/types'
import styles from './last-beer.module.scss'

interface ILastBeerProps {
  beer: Beer
}

const LastBeer = ({ beer }: ILastBeerProps) => {
  const { t } = useTranslation()

  return (
    <section className={styles.lastBeer}>
      <div className={styles.background}>
        <Image data={beer.backgroundImage.responsiveImage} />
      </div>
      <Slide triggerOnce={true} direction="left" className={styles.image}>
        <Image
          data={beer.photoWithBackground.responsiveImage}
          lazyLoad={false}
        />
      </Slide>
      <Slide
        triggerOnce={true}
        direction="up"
        delay={500}
        className={styles.descriptionBox}
        style={{ backgroundColor: beer.backgroundColor.hex }}
      >
        <div>
          <h3>{t('home:freshestBrew')}</h3>
          <p>{beer.name}</p>
          <p>{beer.description}</p>
        </div>
      </Slide>
    </section>
  )
}

export { LastBeer }
