import Link from 'next/link'
import styles from './beer.module.css'
import useTranslation from 'next-translate/useTranslation'
import { Beer } from '@/lib/types'

const BeerTail = ({ category, photo, name, style, slug }: Beer) => {
  const { t } = useTranslation()
  const img = photo.responsiveImage

  return (
    <Link href={`/beers/${category.slug}/${slug}`}>
      <div className={styles.wrapper}>
        <img
          src={img.src}
          srcSet={img.srcSet}
          alt={img.alt}
          title={img.title}
          width={img.width}
          height={img.height}
          className={styles.photo}
        />
        <div className={styles.category}>{category.categoryName}</div>
        <div className={styles.name}>{name}</div>
        <div className={styles.style}>{style}</div>
        <button className={styles.button}>{t('beer:viewDetails')}</button>
      </div>
    </Link>
  )
}

export { BeerTail }
