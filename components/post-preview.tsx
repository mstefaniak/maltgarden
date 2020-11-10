import { ResponsiveImageType } from 'react-datocms'
import { Date } from './date'
import { CoverImage } from './cover-image'
import Link from 'next/link'

interface PostPreviewProps {
  title: string,
  coverImage: {
    responsiveImage: ResponsiveImageType,
  },
  date: string,
  excerpt: string,
  slug: string,
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
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  )
}

export { PostPreview }
