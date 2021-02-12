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

export type Beer = {
  name: string
  description: string
  slug: string
  style: string
  alc: number
  blg: number
  photo: {
    responsiveImage: ResponsiveImageType
  }
  category: {
    categoryName: string
    slug: string
  }
  untappdUrl?: string
}

export interface IBeerCategory {
  id: number
  categoryName: string
  slug: string
  position: number
}

export interface IStaticProps {
  params: Record<string, string | string[]>
  locale: SiteLocale
  preview: boolean
}

export interface IStaticPathsProps {
  locale: string
}
