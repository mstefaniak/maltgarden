import { ResponsiveImageType } from 'react-datocms'

export interface Post {
  body: string
  date: string
  excerpt: string
  heading: string
  headingImage: {
    responsiveImage: ResponsiveImageType
  }
  slug: string
}

export type SiteLocale = 'pl' | 'en'
