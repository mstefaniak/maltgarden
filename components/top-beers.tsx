import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import { Fade, Slide } from 'react-awesome-reveal'
import { isMobile } from 'react-device-detect'
import { RoundLink } from '@/components/ui/round-link'
import { BeerTail } from '@/components/beer-tail'
import { Beer } from '@/lib/types'

import styles from './top-beers.module.scss'

const SeeAll = () => {
  const { t } = useTranslation()
  return <RoundLink href="/beers/newest" text={t('common:seeAll')} />
}

interface Props {
  beers: Beer[]
}

const TopBeers = ({ beers }: Props) => {
  const { t } = useTranslation()

  return (
    <section className={styles.container}>
      <div className={styles.intro}>
        <Fade delay={500} triggerOnce={true}>
          <h3 className={styles.heading}>{t('common:top4title')}</h3>
          <p className={styles.info}>{t('common:top4info')}</p>
          <span className={styles.seeAll}>
            <SeeAll />
          </span>
        </Fade>
      </div>
      {isMobile ? (
        <>
          <div className={styles.beersWrapper}>
            <div className={`${styles.beers} ${styles.beersMobile}`}>
              {beers.map((beer: Beer) => (
                <Link
                  href={`/beers/${beer.category.slug}/${beer.slug}`}
                  key={beer.slug}
                >
                  {/* without DIV wrapper it cant forward ref - to be checked */}
                  <div>
                    <BeerTail {...beer} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.mobileAll}>
            <SeeAll />
          </div>
        </>
      ) : (
        <Slide cascade={true} direction="right" triggerOnce={true}>
          <div className={styles.beers}>
            {beers.map((beer: Beer) => (
              <BeerTail {...beer} />
            ))}
          </div>
        </Slide>
      )}
    </section>
  )
}

export { TopBeers }
