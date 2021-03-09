import { ISlug, IPath } from './types'

const parseSlugsList = (item: ISlug[]): IPath[] => {
  const pathsArray = item.map((post) =>
    post._allSlugLocales.map((slug) => ({
      params: { slug: slug.value },
      locale: slug.locale,
    }))
  )

  return ([] as IPath[]).concat(...pathsArray)
}

export { parseSlugsList }
