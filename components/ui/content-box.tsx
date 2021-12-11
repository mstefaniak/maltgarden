import { ReactNode } from 'react'

import styles from './content-box.module.scss'

interface IContentBoxProps {
  children: ReactNode
}

const ContentBox = ({ children }: IContentBoxProps) => {
  return <div className={styles.ContentBox}>{children}</div>
}

export { ContentBox }
