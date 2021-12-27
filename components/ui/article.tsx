import { PropsWithChildren } from 'react'

import styles from './article.module.scss'

interface Props {
  title?: string
}

export const Article = ({
  title,
  children,
}: PropsWithChildren<Props>): JSX.Element => (
  <article className={styles.Article}>
    {title && <h1>{title}</h1>}
    {children}
  </article>
)
