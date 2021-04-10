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
  excerpt: string
  heading: string
  headingImage: {
    responsiveImage: ResponsiveImageType
  }
}

export type Beer = {
  name: string
  backgroundColor: {
    hex: string
  }
  description: string
  slug: string
  style: string
  alc: number
  blg: number
  backgroundImage: {
    responsiveImage: ResponsiveImageType
  }
  photoWithBackground: {
    responsiveImage: ResponsiveImageType
  }
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

export interface MenuItem {
  name: string
  price: number
  priceSecondary?: number
  description: string
  categoryName: {
    categoryName: string
  }
}
