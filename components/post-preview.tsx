import { ResponsiveImageType } from 'react-datocms'
import { Date } from './date'
import { CoverImage } from './cover-image'
import Link from 'next/link'

interface PostPreviewProps {
  title: string
  coverImage: {
    responsiveImage: ResponsiveImageType
  }
  date: string
  excerpt: string
  slug: string
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: PostPreviewProps) => {
  return (
    <div>
      <div>
        <CoverImage
          slug={slug}
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <h3>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a>{title}</a>
        </Link>
      </h3>
      <div>
        <Date dateString={date} />
      </div>
      <p>{excerpt}</p>
    </div>
  )
}

export { PostPreview }
