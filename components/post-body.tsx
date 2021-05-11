import { useState, useEffect, useCallback } from 'react'
import { RoundLink } from '@/components/ui/round-link'
import useTranslation from 'next-translate/useTranslation'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { ContentBox } from './ui/content-box'
import styles from './ui/single-post.module.scss'

interface IPostBodyProps {
  body: string
  excerpt: string
}

const PostBody = ({ body, excerpt }: IPostBodyProps) => {
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

  if (!parsedBody || !parsedExcerpt) {
    return null
  }

  const toggleMore = () => {
    setIsFullView((prevValue) => !prevValue)
  }

  return (
    <ContentBox>
      <div className={styles.content}>
        {!isFullView && (
          <div dangerouslySetInnerHTML={{ __html: parsedExcerpt }} />
        )}
        {isFullView && <div dangerouslySetInnerHTML={{ __html: parsedBody }} />}
      </div>
      <RoundLink
        text={isFullView ? t('common:readLess') : t('common:readMore')}
        href=""
        onClick={toggleMore}
        hideIcon={isFullView}
      />
    </ContentBox>
  )
}

export { PostBody }
