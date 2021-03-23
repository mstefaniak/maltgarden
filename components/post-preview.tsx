import { Date } from './date'
import { CoverImage } from './cover-image'
import Link from 'next/link'
import { RoundLink } from '@/components/ui/round-link'
import useTranslation from 'next-translate/useTranslation'
import { Post } from '@/lib/types'
import styles from './post-preview.module.scss'

interface IPostPreviewProps {
  post: Post
  showImage?: boolean
  showDate?: boolean
}

const PostPreview = ({
  post,
  showImage = false,
  showDate = false,
}: IPostPreviewProps) => {
  const { heading, headingImage, date, excerpt, slug } = post
  const { t } = useTranslation()

  return (
    <div key={slug} className={styles.postPreview}>
      {showImage && (
        <div>
          <CoverImage
            slug={slug}
            title={heading}
            responsiveImage={headingImage.responsiveImage}
          />
        </div>
      )}
      <h3>
        <Link href={`/posts/${slug}`}>
          <a>{heading}</a>
        </Link>
      </h3>
      {showDate && (
        <div>
          <Date dateString={date} />
        </div>
      )}
      <p>{excerpt}</p>
      <div>
        <RoundLink href={`/posts/${slug}`} text={t('common:readMore')} />
      </div>
    </div>
  )
}

export { PostPreview }
