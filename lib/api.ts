import { CMS_API_URL, CMS_API_TOKEN } from '@/lib/constants'
import { ISlug, Beer } from '@/lib/types'

interface FetchParams {
  variables?: Record<string, any>
  preview?: boolean
}

const responsiveImageFragment: string = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`

const fetchAPI = async (
  query: string,
  { variables, preview }: FetchParams = {}
) => {
  const res = await fetch(CMS_API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CMS_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

const getAbout = async (locale: string, preview?: boolean) => {
  const data = await fetchAPI(
    `
    query About {
      about(locale: ${locale}) {
        title
        paragraph1
        photo {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 600}, sizes: "(max-width: 600px) 100vw, 600px") {
            srcSet
            webpSrcSet
            sizes
            src
            width
            height
            aspectRatio
            alt
            title
            bgColor
            base64
          }
        }
        paragraph2
      }
    }
    `,
    { preview }
  )
  return data?.about
}

const getPreviewPostBySlug = async (slug: string | number) => {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String) {
      post(filter: {slug: {eq: $slug}}) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        slug,
      },
    }
  )
  return data?.post
}

const getAllPostsWithSlug = async () => {
  const data = await fetchAPI(`
    {
      allPosts {
        _allSlugLocales {
          locale
          value
        }
      }
    }
  `)
  return data?.allPosts as ISlug[]
}

const getAllPostsForHome = async (locale: string, preview?: boolean) => {
  const data = await fetchAPI(
    `
    {
      featuredPost: post(locale: ${locale}, orderBy: [featured_DESC, date_DESC]) {
        heading
        slug
        excerpt
        date
        headingImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
      }
      newPosts: allPosts(locale: ${locale}, orderBy: date_DESC, first: 2) {
        heading
        slug
        excerpt
        date
        headingImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}
  `,
    { preview }
  )
  return data
}

const getPostAndMorePosts = async (
  slug: string | number,
  locale?: string,
  preview?: boolean
) => {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: String, $locale: SiteLocale) {
    post(locale: $locale, filter: {slug: {eq: $slug}}) {
      heading
      slug
      body
      date
      headingImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 300 }) {
          ...responsiveImageFragment
        }
      }
    }
    morePosts: allPosts(locale: $locale, orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
      heading
      slug
      excerpt
      date
      headingImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 600, h: 300 }) {
          ...responsiveImageFragment
        }
      }
    }
  }
  ${responsiveImageFragment}
  `,
    {
      preview,
      variables: {
        slug,
        locale,
      },
    }
  )
  return data
}

const getBeerCategories = async (locale?: string) => {
  const data = await fetchAPI(
    `
    query GetBeerCategories($locale: SiteLocale) {
      allBeerCategories(locale: $locale) {
        id
        slug
        categoryName
      }
    }
    `,
    {
      variables: {
        locale,
      },
    }
  )
  return data
}

const getBeers = async (
  locale?: string,
  categoryId?: number,
  preview?: boolean
) => {
  const data = await fetchAPI(
    `
    query GetBeers($locale: SiteLocale, $filter: BeerModelFilter) {
      allBeers(locale: $locale, orderBy: _createdAt_DESC, filter: $filter) {
        slug
        name
        style
        category {
          categoryName
          slug
        }
        photo {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 200, h: 200 }) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}
    `,
    {
      preview,
      variables: {
        locale,
        filter: categoryId ? { category: { eq: categoryId } } : {},
      },
    }
  )

  return data.allBeers
}

const getBeerBySlug = async (
  slug: string,
  locale?: string,
  preview?: boolean
) => {
  const data = await fetchAPI(
    `
    query GetBeer($locale: SiteLocale, $slug: String) {
      beer(locale: $locale, filter: {slug: {eq: $slug}}) {
        alc
        blg
        description
        ingredients
        name
        untappdUrl
        style
        category {
          categoryName
          slug
        }
        photo {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 400, h: 400 }) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}
    `,
    {
      preview,
      variables: {
        locale,
        slug,
      },
    }
  )

  return data.beer
}

const getAllBeersWithSlug = async () => {
  const data = await fetchAPI(`
    {
      allBeers {
        slug
        category {
          slug
        }
      }
    }
  `)
  return data?.allBeers as Beer[]
}

export {
  getAbout,
  getPreviewPostBySlug,
  getAllPostsWithSlug,
  getAllPostsForHome,
  getPostAndMorePosts,
  getBeerCategories,
  getBeers,
  getAllBeersWithSlug,
  getBeerBySlug,
}
