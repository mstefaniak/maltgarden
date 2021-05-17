import { Beer } from '@/lib/types'
import { BeerTailSimple } from '@/components/beer-tail-simple'
import styles from './beer.module.scss'

const BeerCategory = ({ beers }: { beers: Beer[] }) => {
  return (
    <section className={styles.listWrapper}>
      {Array.isArray(beers) &&
        beers.map((beer) => <BeerTailSimple {...beer} key={beer.slug} />)}
    </section>
  )
}

export { BeerCategory }
