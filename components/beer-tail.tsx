import Image from 'next/image'
import styles from './beer.module.css'
import useTranslation from 'next-translate/useTranslation'
import { Beer } from '@/lib/types'
import { RoundLink } from '@/components/ui/round-link'
import { Slider } from '@/components/ui/slider'

const BeerTail = ({ category, photo, name, style, slug }: Beer) => {
  const { t } = useTranslation()
  const img = photo.responsiveImage
  const beerURL = `/beers/${category.slug}/${slug}`

  const handleChange = (newValue: number) => {
    // TODO: handle image resize
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.photo}>
          <Image
            src={img.src as string}
            alt={img.alt}
            title={img.title}
            width={img.width as number}
            height={img.height as number}
          />
        </div>
        <div className={styles.details}>
          <div className={styles.category}>{category.categoryName}</div>
          <div className={styles.name}>{name}</div>
          <div className={styles.style}>{style}</div>
          <RoundLink href={beerURL} text={t('common:more')} />
          <Slider min={10} max={90} defaultValue={10} onChange={handleChange} />
        </div>
      </div>
    </>
  )
}

export { BeerTail }
