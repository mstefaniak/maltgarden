import { CMS_API_URL, CMS_API_TOKEN, POSTS_PER_PAGE } from '@/lib/constants'
import { Beer, Post, MenuItem } from '@/lib/types'

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
        title1
        paragraph1
        photo1 {
          responsiveImage(imgixParams: {fm: png, fit: crop, ar: "1:1"}, sizes: "(max-width: 600px) 100vw, 600px") {
            ...responsiveImageFragment
          }
        }
        title2
        paragraph2
        title3
        paragraph3
        photo3 {
          responsiveImage(imgixParams: {fm: png, fit: crop, ar: "1:1"}, sizes: "(max-width: 600px) 100vw, 600px") {
            ...responsiveImageFragment
          }
        }
        seo {
          title
          description
        }
      }
    }
    ${responsiveImageFragment}
    `,
    { preview }
  )
  return data?.about
}

const getPreviewPostBySlug = async (slug: string) => {
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
  return data?.post as Partial<Post>
}

const getPreviewBeerBySlug = async (slug: string) => {
  const data = await fetchAPI(
    `
    query BeerBySlug($slug: String) {
      beer(filter: {slug: {eq: $slug}}) {
        slug
        category {
          slug
        }
      }
    }`,
    {
      preview: true,
      variables: {
        slug,
      },
    }
  )
  return data?.beer as Partial<Beer>
}

const getAllPosts = async (locale: string, offset: number = 0) => {
  const data = await fetchAPI(
    `
    query AllPosts($locale: SiteLocale, $offset: IntType, $perPage: IntType) {
      allPosts(locale: $locale, orderBy: _publishedAt_DESC, first: $perPage, skip: $offset) {
        heading
        excerpt
        body
        headingImage {
          responsiveImage(imgixParams: {auto: format, fit: crop}) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}
  `,
    {
      variables: {
        locale,
        offset,
        perPage: POSTS_PER_PAGE,
      },
    }
  )
  return data?.allPosts as Post[]
}

const getAllPostsCount = async () => {
  const data = await fetchAPI(
    `
    query AllPostsCount {
      _allPostsMeta {
        count
      }
    }
  `
  )
  return data?._allPostsMeta.count as number
}

const getAllPostsForHome = async (locale: string) => {
  const data = await fetchAPI(
    `
    query AllPostsForHome($locale: SiteLocale) {
      newPosts: allPosts(locale: $locale, orderBy: _publishedAt_DESC, first: 2) {
        heading
        excerpt
        body
      }
    }
  `,
    {
      variables: {
        locale,
      },
    }
  )
  return data.newPosts
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

const getBeers = async (locale?: string, categoryId?: number) => {
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
          responsiveImage(imgixParams: { auto: format }) {
            ...responsiveImageFragment
          }
        }
        photoWithBackground {
          responsiveImage(imgixParams: { auto: format }) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}
    `,
    {
      variables: {
        locale,
        filter: categoryId ? { category: { eq: categoryId } } : {},
      },
    }
  )

  return data.allBeers
}

const getNewestBeers = async (locale?: string) => {
  const data = await fetchAPI(
    `
    query GetTopBeers($locale: SiteLocale) {
      allBeers(locale: $locale, orderBy: _createdAt_DESC, first: 6) {
        slug
        name
        style
        category {
          slug
        }
        photo {
          responsiveImage(imgixParams: {auto: format}) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}
    `,
    {
      variables: {
        locale,
      },
    }
  )

  return data.allBeers as Beer[]
}

const getTopBeers = async (locale?: string) => {
  const data = await fetchAPI(
    `
    query GetTopBeers($locale: SiteLocale, $filter: BeerModelFilter) {
      allBeers(locale: $locale, orderBy: _createdAt_DESC, filter: $filter, first: 4) {
        slug
        name
        style
        category {
          slug
        }
        photo {
          responsiveImage(imgixParams: {auto: format}) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}
    `,
    {
      variables: {
        locale,
        filter: { top4: { eq: true } },
      },
    }
  )

  return data.allBeers as Beer[]
}

const getLastBeer = async (locale?: string) => {
  const data = await fetchAPI(
    `
    query GetLastBeer($locale: SiteLocale) {
      beer(locale: $locale, orderBy: _createdAt_DESC) {
        slug
        name
        description
        category {
          slug
        }
        backgroundColor {
          hex
        }
        backgroundImage {
          responsiveImage(imgixParams: {fm: png }) {
            ...responsiveImageFragment
          }
        }
        photoWithBackground {
          responsiveImage(imgixParams: {auto: format, fit: crop }) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}
    `,
    {
      variables: {
        locale,
      },
    }
  )

  return data.beer as Beer
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
        name
        description
        ingredients
        untappdUrl
        style
        category {
          slug
        }
        backgroundColor {
          hex
        }
        backgroundImage {
          responsiveImage(imgixParams: {fm: png }) {
            ...responsiveImageFragment
          }
        }
        photoWithBackground {
          responsiveImage(imgixParams: {auto: format, fit: crop }) {
            ...responsiveImageFragment
          }
        }
        seoDescription {
          description
          title
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

const getMenu = async (locale: string) => {
  const data = await fetchAPI(
    `
    query Menu($locale: SiteLocale) {
      allMenuItems(locale: $locale) {
        name
        price
        priceSecondary
        description
        categoryName {
          categoryName
        }
      }
    }
  `,
    {
      variables: {
        locale,
      },
    }
  )
  return data?.allMenuItems as MenuItem[]
}

export {
  getAbout,
  getPreviewPostBySlug,
  getPreviewBeerBySlug,
  getAllPosts,
  getAllPostsCount,
  getAllPostsForHome,
  getBeerCategories,
  getBeers,
  getNewestBeers,
  getTopBeers,
  getAllBeersWithSlug,
  getBeerBySlug,
  getLastBeer,
  getMenu,
}
