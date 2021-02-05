import Link from 'next/link'
import styles from './beer.module.css'
import useTranslation from 'next-translate/useTranslation'

type BeerTailProps = {
  category: {
    categoryName: string
    slug: string
  }
  photo: {
    responsiveImage: any
  }
  alc: number
  name: string
  style: string
  slug: string
}

const BeerTail = ({ category, photo, name, style, slug }: BeerTailProps) => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <img {...photo.responsiveImage} className={styles.photo} />
      <div className={styles.category}>{category.categoryName}</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.style}>{style}</div>
      <Link href={`/beers/${category.slug}/${slug}`}>
        <button className={styles.button}>{t('beer:viewDetails')}</button>
      </Link>
    </div>
  )
}

export { BeerTail }
