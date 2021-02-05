import { ResponsiveImageType } from 'react-datocms'
import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '@/components/layout'
import { BeerTail } from '@/components/beer-tail'
import { getBeerCategories, getBeers } from '@/lib/api'
import useTranslation from 'next-translate/useTranslation'

type BeerCategory = {
  id: number
  categoryName: string
  slug: string
  position: number
}

type Beer = {
  name: string
  description: string
  slug: string
  style: string
  alc: number
  blg: number
  photo: {
    responsiveImage: ResponsiveImageType
  }
  category: {
    categoryName: string
    slug: string
  }
}

type BeersProps = {
  beerCategories?: BeerCategory[]
  beers?: Beer[]
}

const Beers = ({ beerCategories = [], beers = [] }: BeersProps) => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Head>
        <meta name="og:title" content="Beers" />
      </Head>
      <h2>{t('beer:title')}</h2>
      <ul>
        <li key="0">
          <Link href="/beers">
            <a>{t('beer:all')}</a>
          </Link>
        </li>
        {beerCategories.map(({ slug, categoryName }) => (
          <li key={slug}>
            <Link href={`/beers/${slug}`}>
              <a>{categoryName}</a>
            </Link>
          </li>
        ))}
      </ul>
      <section>
        {Array.isArray(beers) && beers.map((beer) => <BeerTail {...beer} />)}
      </section>
    </Layout>
  )
}

const getStaticProps = async ({ locale, preview = false }) => {
  const data = await getBeerCategories(locale)
  const beers = await getBeers(locale, null, preview)

  return {
    props: { beerCategories: data.allBeerCategories, beers },
  }
}

export default Beers
export { getStaticProps }
