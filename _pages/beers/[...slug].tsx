import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout } from '@/components/layout'
import {
  getAllBeersWithSlug,
  getBeerBySlug,
  getBeerCategories,
  getBeers,
} from '@/lib/api'
import { Beer, IBeerCategory } from '@/lib/types'
import { BeerCategory } from '@/components/beer-category'
import useTranslation from 'next-translate/useTranslation'
import styles from '@/components//beer.module.css'

const SingleBeer = ({
  alc,
  blg,
  description,
  name,
  photo,
  category,
  style,
  untappdUrl,
}: Beer) => {
  const { t } = useTranslation()
  const img = photo.responsiveImage

  return (
    <section>
      <img
        src={img.src}
        srcSet={img.srcSet}
        alt={img.alt}
        width={img.width}
        height={img.height}
        title={img.title}
      />
      <div>{category.categoryName}</div>
      <div>{name}</div>
      <div>{style}</div>
      <div>
        {t('beer:alc')}: {alc}%
      </div>
      <div>
        {t('beer:blg')}: {blg}
      </div>
      <div>{description}</div>
      {untappdUrl && (
        <div>
          <a href={untappdUrl}>UNTAPPD</a>
        </div>
      )}
    </section>
  )
}

type ComponentProps = {
  beerCategories: IBeerCategory[]
  beer: Beer | null
  beers: Beer[] | null
  isSingleBeerView: boolean
  categoryName?: string
}

const View = ({
  beerCategories = [],
  beer,
  beers,
  categoryName,
  isSingleBeerView,
}: ComponentProps) => {
  const title = isSingleBeerView ? beer.name : categoryName
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Layout>
      <Head>
        <meta name="og:title" content={title} />
      </Head>
      <h2>{t('beer:title')}</h2>
      <ul>
        <li
          key="0"
          className={router.asPath === '/beers/all' ? styles.active : ''}
        >
          <Link href="/beers/all">
            <a>{t('beer:all')}</a>
          </Link>
        </li>
        {beerCategories.map(({ slug, categoryName }) => (
          <li
            key={slug}
            className={router.asPath === `/beers/${slug}` ? styles.active : ''}
          >
            <Link href={`/beers/${slug}`}>
              <a>{categoryName}</a>
            </Link>
          </li>
        ))}
      </ul>

      {isSingleBeerView ? (
        <SingleBeer {...beer} />
      ) : (
        <BeerCategory beers={beers} />
      )}
    </Layout>
  )
}

const getStaticProps = async ({ params, locale, preview = false }) => {
  const [categorySlug, beerSlug] = params.slug
  const response = await getBeerCategories(locale)
  const beerCategories = response.allBeerCategories as IBeerCategory[]

  const isSingleBeerView = !!beerSlug
  const props = {
    preview,
    beerCategories,
    beer: null,
    beers: null,
    categoryName: null,
    isSingleBeerView,
  }

  if (isSingleBeerView) {
    const data = await getBeerBySlug(beerSlug, locale, preview)
    props.beer = data
  } else if (categorySlug === 'all') {
    props.categoryName = 'All beers'
    props.beers = await getBeers(locale, null, preview)
  } else {
    const selectedCategory = beerCategories.find(
      (category) => categorySlug === category.slug
    )
    props.categoryName = selectedCategory.categoryName
    props.beers = await getBeers(locale, selectedCategory.id, preview)
  }

  return { props }
}

const getStaticPaths = async ({ locale }) => {
  const allBeers = await getAllBeersWithSlug()
  const response = await getBeerCategories(locale)
  const categories = response.allBeerCategories

  return {
    paths: [
      '/beers/all',
      ...allBeers?.map((beer) => `/beers/${beer.category.slug}/${beer.slug}`),
      ...categories?.map((category) => `/beers/${category.slug}`),
    ],
    fallback: false,
  }
}

export default View
export { getStaticProps, getStaticPaths }
