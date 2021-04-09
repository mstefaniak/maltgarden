import { useRef } from 'react'
import { Image } from 'react-datocms'
import styles from './beer.module.css'
import useTranslation from 'next-translate/useTranslation'
import { Beer } from '@/lib/types'
import { RoundLink } from '@/components/ui/round-link'
import { Slider } from '@/components/ui/slider'
import { useRefState } from '@/hooks/ref-state'

const BASE_SLIDER_VAL = 5

const BeerTail = ({ category, photo, name, style, slug }: Beer) => {
  const { t } = useTranslation()
  const [sliderValue, sliderValueRef, setSliderValue] = useRefState<number>(
    BASE_SLIDER_VAL
  )
  const img = photo.responsiveImage
  const BASE_WIDTH = img.width
  const BASE_HEIGHT = img.height ?? 295
  const beerURL = `/beers/${category.slug}/${slug}`
  const imgContainerRef = useRef<HTMLDivElement>(null)
  const intervalHandler = useRef<NodeJS.Timeout>()

  const resizeImage = (width: number, height: number) => {
    if (imgContainerRef.current) {
      imgContainerRef.current.style.width = `${width}px`
      imgContainerRef.current.style.height = `${height}px`
    }
  }

  const calcRatio = (val: number): number => (val + 95) / 100

  const handleSliderChange = (newValue: number) => {
    requestAnimationFrame(() => {
      setSliderValue(newValue)
      const ratio = calcRatio(newValue)
      resizeImage(ratio * BASE_WIDTH, ratio * BASE_HEIGHT)
    })
  }

  const handleMouseOver = () => {
    if (intervalHandler.current) {
      clearInterval(intervalHandler.current)
    }
  }

  const handleMouseLeave = () => {
    intervalHandler.current = setInterval(() => {
      requestAnimationFrame(() => {
        const newSliderValue = sliderValueRef.current - 1
        const ratio = calcRatio(newSliderValue)
        const newWidth = ratio * BASE_WIDTH
        const newHeight = ratio * BASE_HEIGHT

        if (
          newSliderValue > BASE_SLIDER_VAL &&
          (newWidth >= BASE_WIDTH || newHeight >= BASE_HEIGHT)
        ) {
          sliderValueRef.current = newSliderValue
          resizeImage(newWidth, newHeight)
        } else if (intervalHandler.current) {
          clearInterval(intervalHandler.current)
          resizeImage(BASE_WIDTH, BASE_HEIGHT)
          setSliderValue(BASE_SLIDER_VAL)
        }
      })
    }, 20)
  }

  return (
    <section onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <div className={styles.wrapper}>
        <div className={styles.photoWrapper}>
          <div className={styles.photo} ref={imgContainerRef}>
            <Image data={photo.responsiveImage} lazyLoad={false} />
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.category}>{category.categoryName}</div>
          <div className={styles.name}>{name}</div>
          <div className={styles.style}>{style}</div>
          <RoundLink href={beerURL} text={t('common:more')} />
          <Slider
            min={0}
            max={40}
            margin={BASE_SLIDER_VAL}
            value={sliderValue}
            onChange={handleSliderChange}
          />
        </div>
      </div>
    </section>
  )
}

export { BeerTail }
