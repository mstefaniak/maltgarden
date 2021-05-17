import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Meta } from '@/components/meta'
import { Layout } from '@/components/layout'
import Image from 'next/image'
import {
  getAllBeersWithSlug,
  getBeerBySlug,
  getBeerCategories,
  getBeers,
} from '@/lib/api'
import { Beer, IBeerCategory } from '@/lib/types'
import { BeerCategory } from '@/components/beer-category'
import useTranslation from 'next-translate/useTranslation'
import getT from 'next-translate/getT'
import styles from '@/components/beer.module.scss'
import { ContentBox } from '@/components/ui/content-box'
import { route } from 'next/dist/next-server/server/router'

interface HeadingProps {
  title: string
}

const Heading = ({ title }: HeadingProps) => {
  const titleChunks = title?.split(' ') ?? []

  return (
    <header className={styles.header}>
      <div className={styles.headerImg}>
        <Image
          src="/images/beers-bg.png"
          alt="Maltgarden Beers"
          layout="fill"
        />
      </div>
      <div className={styles.headerContent}>
        <ContentBox>
          <h1 className={styles.title}>
            {titleChunks.map((chunk) => (
              <span>{chunk}</span>
            ))}
          </h1>
        </ContentBox>
      </div>
    </header>
  )
}

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
  const router = useRouter()
  const handleClose = () => {
    router.back()
  }

  return (
    <section>
      <button onClick={handleClose}>X</button>
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
  beers: Beer[]
  isSingleBeerView: boolean
  categoryName?: string
  preview: boolean
}

const View = ({
  beerCategories = [],
  beer,
  beers = [],
  categoryName,
  isSingleBeerView,
  preview,
}: ComponentProps) => {
  const title = isSingleBeerView && beer?.name ? beer.name : categoryName
  const pageTitle = beer?.seoDescription?.title ?? `${title} - Maltgarden`
  const router = useRouter()

  if (isSingleBeerView) {
    return (
      <Layout preview={preview}>
        <Meta
          title={pageTitle}
          description={beer?.seoDescription?.description}
          imageUrl={beer?.seoDescription?.image?.url}
        />

        <ContentBox>{beer && <SingleBeer {...beer} />}</ContentBox>
      </Layout>
    )
  }

  return (
    <Layout preview={preview} heading={<Heading title={title} />}>
      <Meta title={pageTitle} />

      <ContentBox>
        <div className={styles.beerContent}>
          <ul className={styles.beerMenu}>
            {beerCategories.map(({ slug, categoryName }) => (
              <li
                key={slug}
                className={
                  router.asPath === `/beers/${slug}` ? styles.active : ''
                }
              >
                <Link href={`/beers/${slug}`}>
                  <a>{categoryName}</a>
                </Link>
              </li>
            ))}
          </ul>
          <BeerCategory beers={beers} />
        </div>
      </ContentBox>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  preview = false,
}) => {
  const t = await getT(locale, 'beer')
  const [categorySlug, beerSlug] = params?.slug as string[]
  const response = await getBeerCategories(locale)
  const beerCategories = response.allBeerCategories as IBeerCategory[]

  const isSingleBeerView = !!beerSlug
  const props: {
    preview: boolean
    beerCategories: IBeerCategory[]
    beer: Beer | null
    beers: Beer[] | null
    categoryName: string | null
    isSingleBeerView: boolean
  } = {
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
  } else {
    const selectedCategory = beerCategories.find(
      (category) => categorySlug === category.slug
    )
    if (selectedCategory) {
      props.categoryName = selectedCategory.categoryName
      props.beers = await getBeers(locale, selectedCategory.id, preview)
    }
  }

  return { props }
}

const getStaticPaths: GetStaticPaths = async () => {
  const allBeers = await getAllBeersWithSlug()
  const response = await getBeerCategories()
  const categories = response.allBeerCategories as IBeerCategory[]

  return {
    paths: [
      ...allBeers?.map((beer) => `/beers/${beer.category.slug}/${beer.slug}`),
      ...categories?.map((category) => `/beers/${category.slug}`),
    ],
    fallback: true,
  }
}

export default View
export { getStaticProps, getStaticPaths }
