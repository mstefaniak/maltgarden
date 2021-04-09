import { GetStaticProps } from 'next'
import { Layout } from '@/components/layout'
import { Meta } from '@/components/meta'
import { getMenu } from '@/lib/api'
import { MenuItem } from '@/lib/types'
import styles from './beer-and-food.module.scss'
import { ContentBox } from '@/components/ui/content-box'
import useTranslation from 'next-translate/useTranslation'

type Menu = Record<string, MenuItem[]>

interface IBeerAndFoodProps {
  categories: string[]
  menu: Menu
}

const BeerAndFood = ({ categories, menu }: IBeerAndFoodProps) => {
  const { t } = useTranslation()
  //TODO
  const seo = {
    title: '',
    description: '',
  }

  return (
    <Layout>
      <Meta title={seo.title} description={seo.description} />
      <ContentBox>
        <h1>Maltgarden Beer & Food</h1>
        <p>{t('beernfood:info')}</p>
        {categories.map((categoryName) => (
          <div className={styles.menu}>
            <h2>{categoryName}</h2>
            {menu[categoryName].map((menuItem) => (
              <dl class={styles.menuRow}>
                <dt className={styles.nameRow}>
                  <span>{menuItem.name}</span>
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
              </dl>
            ))}
          </div>
        ))}
      </ContentBox>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async (context) => {
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
    },
  }
}

export default BeerAndFood
export { getStaticProps }
