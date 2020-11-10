import { ResponsiveImageType } from 'react-datocms'
import { Date } from './date'
import { CoverImage } from './cover-image'

interface PostHeaderProps {
  title: string,
  coverImage: {
    responsiveImage: ResponsiveImageType,
  },
  date: string,
}

const PostHeader = ({ title, coverImage, date }: PostHeaderProps) => {
  return (
    <>
      <h1>{title}</h1>
      <div>
        <CoverImage
          title={title}
          responsiveImage={coverImage.responsiveImage}
        />
      </div>
      <div>
        <div>
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}

export { PostHeader }
