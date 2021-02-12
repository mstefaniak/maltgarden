import { Beer } from '@/lib/types'
import { BeerTail } from '@/components/beer-tail'

const BeerCategory = ({ beers }: { beers: Beer[] }) => {
  return (
    <section>
      {Array.isArray(beers) &&
        beers.map((beer) => <BeerTail {...beer} key={beer.slug} />)}
    </section>
  )
}

export { BeerCategory }
