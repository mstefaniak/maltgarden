import { memo, useMemo, useState, useEffect, useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'

import { RoundButton } from '@/components/ui/round-button'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { ContentBox } from './ui/content-box'

import styles from './ui/single-post.module.scss'

interface Props {
  body: string
  excerpt: string
}

const PostBody = memo(({ body, excerpt }: Props) => {
  const { t } = useTranslation()
  const [isFullView, setIsFullView] = useState(false)
  const [parsedBody, setParsedBody] = useState<string>()
  const [parsedExcerpt, setParsedExcerpt] = useState<string>()

  const parseContent = useCallback(async () => {
    if (body && excerpt) {
      const parsedBodyMarkdown = await markdownToHtml(body)
      setParsedBody(parsedBodyMarkdown)
      const parsedExcerptMarkdown = await markdownToHtml(excerpt)
      setParsedExcerpt(parsedExcerptMarkdown)
    }
  }, [body, excerpt])

  useEffect(() => {
    parseContent()
  }, [parsedBody])

  const content = useMemo(
    () => (isFullView ? parsedBody : parsedExcerpt),
    [isFullView, parsedBody, parsedExcerpt]
  )

  if (!parsedBody || !parsedExcerpt) {
    return null
  }

  const toggleMore = () => {
    setIsFullView((prevValue) => !prevValue)
  }

  return (
    <ContentBox>
      <article
        className={`${styles.content} ${isFullView && styles.isExpanded}`}
      >
        <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
      </article>
      <RoundButton
        text={isFullView ? t('common:readLess') : t('common:readMore')}
        onClick={toggleMore}
        hideIcon={isFullView}
      />
    </ContentBox>
  )
})

export { PostBody }
