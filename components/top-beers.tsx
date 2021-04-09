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
      <Fade delay={500} triggerOnce={true}>
        <div>
          <h2 className={styles.heading}>{t('common:top4title')}</h2>
          <p className={styles.info}>{t('common:top4info')}</p>
          <RoundLink href="/beers/all" text={t('common:seeAll')} />
        </div>
      </Fade>
      <Slide cascade={true} direction="right" triggerOnce={true}>
        {beers.map((beer: Beer, index: number) => (
          <span>
            <BeerTail {...beer} />
          </span>
        ))}
      </Slide>
    </section>
  )
}

export { TopBeers }
