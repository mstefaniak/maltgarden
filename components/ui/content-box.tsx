import { ReactNode } from 'react'

interface IContentBoxProps {
  children: ReactNode
}

const ContentBox = ({ children }: IContentBoxProps) => {
  return (
    <div
      style={{
        maxWidth: '100rem',
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  )
}

export { ContentBox }
