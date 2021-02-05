import Head from 'next/head'
import { Layout } from '@/components/layout'
import { getAllBeersWithSlug, getBeerBySlug } from '@/lib/api'
import { Beer } from '@/lib/types'
import useTranslation from 'next-translate/useTranslation'

const SingleBeer = ({ beer }: { beer: Beer }) => {
  const { t } = useTranslation()
  const img = beer.photo.responsiveImage

  return (
    <Layout>
      <Head>
        <meta name="og:title" content={beer.name} />
      </Head>
      <section>
        <img
          src={img.src}
          srcSet={img.srcSet}
          alt={img.alt}
          width={img.width}
          height={img.height}
          title={img.title}
        />
        <div>{beer.category.categoryName}</div>
        <div>{beer.name}</div>
        <div>{beer.style}</div>
        <div>
          {t('beer:alc')}: {beer.alc}%
        </div>
        <div>
          {t('beer:blg')}: {beer.blg}
        </div>
        <div>{beer.description}</div>
        {beer.untappdUrl && (
          <div>
            <a href={beer.untappdUrl}>UNTAPPD</a>
          </div>
        )}
      </section>
    </Layout>
  )
}

const getStaticProps = async ({ params, locale, preview = false }) => {
  const [_, beerSlug] = params.slug
  const beer = await getBeerBySlug(beerSlug, locale, preview)

  return {
    props: {
      preview,
      beer,
    },
  }
}

const getStaticPaths = async () => {
  const allBeers = await getAllBeersWithSlug()

  return {
    paths:
      allBeers?.map((beer) => `/beers/${beer.category.slug}/${beer.slug}`) ||
      [],
    fallback: true,
  }
}

export default SingleBeer
export { getStaticProps, getStaticPaths }
