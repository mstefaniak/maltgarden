import { Image, ResponsiveImageType } from 'react-datocms'
import Link from 'next/link'

interface CoverImageProps {
  title: string
  responsiveImage: ResponsiveImageType
  slug?: string
}

const CoverImage = ({ title, responsiveImage, slug }: CoverImageProps) => {
  const image = (
    <Image
      data={{
        ...responsiveImage,
        alt: `Cover Image for ${title}`,
      }}
    />
  )
  return (
    <div>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export { CoverImage }
