import { ResponsiveImageType } from 'react-datocms'

interface ISeoDescription {
  description: string
  title: string
  image: {
    url: string
  }
}

export interface Post {
  body: string
  date: string
  excerpt: string
  heading: string
  headingImage: {
    responsiveImage: ResponsiveImageType
  }
  slug: string
  seoDescription?: ISeoDescription
}

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
  seoDescription?: ISeoDescription
}

export interface IBeerCategory {
  id: number
  categoryName: string
  slug: string
  position: number
}

type Slug = {
  value: string
  locale: string
}

export interface ISlug {
  _allSlugLocales: Slug[]
  category?: {
    _allSlugLocales: Slug[]
  }
}

export interface IPath {
  params: {
    slug: string
  }
  locale: string
}
