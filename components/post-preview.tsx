import { Date } from './date'
import { CoverImage } from './cover-image'
import Link from 'next/link'
import { Post } from '@/lib/types'

const PostPreview = ({
  heading,
  headingImage,
  date,
  excerpt,
  slug,
}: Partial<Post>) => {
  return (
    <div key={slug}>
      <div>
        <CoverImage
          slug={slug}
          title={heading}
          responsiveImage={headingImage.responsiveImage}
        />
      </div>
      <h3>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a>{heading}</a>
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
