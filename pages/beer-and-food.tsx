import { GetStaticProps } from 'next'
import Image from 'next/image'
import {
  Image as DatoImage,
  QueryListenerOptions,
  useQuerySubscription,
} from 'react-datocms'
import { Layout } from '@/components/layout'
import { Meta } from '@/components/meta'
import { request, BEER_AND_FOOD_QUERY } from '@/lib/api'
import { MenuItem, IBeerAndFood } from '@/lib/types'
import { ContentBox } from '@/components/ui/content-box'
import useTranslation from 'next-translate/useTranslation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons'
import { FB_PUB_URL, INSTAGRAM_PUB_URL, CMS_API_TOKEN } from '@/lib/constants'

import styles from './beer-and-food.module.scss'

const Heading = () => {
  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <div className={styles.headerMask} />
      <div className={styles.headerImg}>
        <Image
          src="/images/beer-food-header.png"
          alt="Maltgarden snack - Header"
          layout="fill"
        />
      </div>
      <div className={styles.headerContent}>
        <h1>Maltgarden Beer & Food</h1>
        <p className={styles.info}>{t('beernfood:info')}</p>
        <p>
          <span className={styles.mapPin}>
            <Image
              src="/images/map-marker.svg"
              alt="Addresss - map marker"
              width="24"
              height="32"
            />
          </span>
          Morska 6, Kołobrzeg
        </p>
        <p>
          {t('common:followUs')}
          <a
            href={FB_PUB_URL}
            rel="nofollow noindex"
            target="_blank"
            className={styles.icon}
          >
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>
          <a
            href={INSTAGRAM_PUB_URL}
            rel="nofollow noindex"
            target="_blank"
            className={styles.icon}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </p>
      </div>
    </header>
  )
}

type Menu = Record<string, MenuItem[]>

interface Props {
  subscription: QueryListenerOptions<IBeerAndFood, unknown>
  preview: boolean
}

const BeerAndFood = ({ subscription, preview }: Props) => {
  const { data } = useQuerySubscription(subscription)

  if (!data) {
    return null
  }

  const { menuImage, seo } = data.beerAndFood
  const { responsiveImage } = menuImage

  return (
    <Layout backgroundColor="blue" heading={<Heading />} preview={preview}>
      {seo && <Meta title={seo.title} description={seo.description} />}
      <ContentBox>
        {responsiveImage && (
          <DatoImage className={styles.photo} data={responsiveImage} />
        )}
      </ContentBox>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async (context) => {
  const preview = context.preview ?? false
  const graphqlRequest = {
    query: BEER_AND_FOOD_QUERY,
    variables: { locale: context.locale },
    preview,
  }

  const subscription = context.preview
    ? {
        ...graphqlRequest,
        enabled: true,
        initialData: await request(graphqlRequest),
        token: CMS_API_TOKEN,
      }
    : {
        enabled: false,
        initialData: await request(graphqlRequest),
      }

  return {
    props: {
      subscription,
      preview,
    },
  }
}

export default BeerAndFood
export { getStaticProps }
