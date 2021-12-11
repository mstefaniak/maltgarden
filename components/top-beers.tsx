import { Fade, Slide } from 'react-awesome-reveal'
import { RoundLink } from '@/components/ui/round-link'
import { BeerTail } from '@/components/beer-tail'
import { Beer } from '@/lib/types'
import useTranslation from 'next-translate/useTranslation'
import styles from './top-beers.module.scss'

interface ITopBeersProps {
  beers: Beer[]
}

const TopBeers = ({ beers }: ITopBeersProps) => {
  const { t } = useTranslation()

  return (
    <section className={styles.container}>
      <div className={styles.intro}>
        <Fade delay={500} triggerOnce={true}>
          <h3 className={styles.heading}>{t('common:top4title')}</h3>
          <p className={styles.info}>{t('common:top4info')}</p>
          <RoundLink href="/beers/newest" text={t('common:seeAll')} />
        </Fade>
      </div>
      <Slide cascade={true} direction="right" triggerOnce={true}>
        <div className={styles.beers}>
          {beers.map((beer: Beer, index: number) => (
            <span>
              <BeerTail {...beer} />
            </span>
          ))}
        </div>
      </Slide>
    </section>
  )
}

export { TopBeers }
