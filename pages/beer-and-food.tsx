import { GetStaticProps } from 'next'
import { Layout } from '@/components/layout'
import { Meta } from '@/components/meta'
import { getMenu } from '@/lib/api'
import { MenuItem } from '@/lib/types'
import styles from './beer-and-food.module.scss'
import { ContentBox } from '@/components/ui/content-box'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons'
import { FB_PUB_URL, INSTAGRAM_PUB_URL } from '@/lib/constants'

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

interface IBeerAndFoodProps {
  categories: string[]
  menu: Menu
  preview: boolean
}

const BeerAndFood = ({ categories, menu, preview }: IBeerAndFoodProps) => {
  //TODO
  const seo = {
    title: '',
    description: '',
  }

  return (
    <Layout backgroundColor="blue" heading={<Heading />} preview={preview}>
      <Meta title={seo.title} description={seo.description} />
      <ContentBox>
        {categories.map((categoryName, index) => (
          <div className={styles.menu}>
            {index === 0 && (
              <div className={styles.pubLogo}>
                <Image
                  src="/images/beer-food.png"
                  alt="Maltgarden Beer & Food"
                  layout="fill"
                />
              </div>
            )}
            <h2>{categoryName}</h2>
            <dl className={styles.menuSection}>
              {menu[categoryName].map((menuItem) => (
                <>
                  <dt className={styles.nameRow}>
                    <span className={styles.itemName}>{menuItem.name}</span>
                    <span>
                      {menuItem.priceSecondary && (
                        <>
                          {menuItem.priceSecondary} zł {' / '}
                        </>
                      )}
                      {menuItem.price} zł
                    </span>
                  </dt>
                  <dd className={styles.descRow}>{menuItem.description}</dd>
                </>
              ))}
            </dl>
          </div>
        ))}
      </ContentBox>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async (context) => {
  const preview = context.preview ?? false
  const data = await getMenu(context.locale as string)
  const categories = data.reduce(
    (a, v) => a.add(v.categoryName.categoryName),
    new Set()
  ) as Set<string>
  const menu = data.reduce((a: Menu, v: MenuItem) => {
    if (!a[v.categoryName.categoryName]) {
      a[v.categoryName.categoryName] = []
    }

    a[v.categoryName.categoryName].push(v)

    return a
  }, {})

  return {
    props: {
      categories: Array.from(categories),
      menu,
      preview,
    },
  }
}

export default BeerAndFood
export { getStaticProps }
