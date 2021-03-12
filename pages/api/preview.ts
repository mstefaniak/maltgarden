import { getPreviewPostBySlug, getPreviewBeerBySlug } from '@/lib/api'
import { NextPageContext, NextApiResponse } from 'next'
import { Beer, Post } from '@/lib/types'

export default async function preview(
  req: NextPageContext,
  res: NextApiResponse
) {
  if (
    req.query.secret !== process.env.DATOCMS_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const [category, slug] = (req.query.slug as string).split('/')
  let location = ''
  let page: Partial<Beer> & Partial<Post> = {}

  if (category === 'beers') {
    page = await getPreviewBeerBySlug(slug as string)
    if (page) {
      location = `/beers/${page?.category?.slug}/${page.slug}`
    }
  } else if (category === 'posts') {
    page = await getPreviewPostBySlug(slug as string)
    if (page) {
      location = `/posts/${page.slug}`
    }
  }

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!page.slug) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: location })
  res.end()
}
