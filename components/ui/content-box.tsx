import { ReactNode } from 'react'

interface IContentBoxProps {
  children: ReactNode
}

const ContentBox = ({ children }: IContentBoxProps) => {
  return (
    <div
      style={{
        maxWidth: '88rem',
        margin: '0 auto',
        padding: '0 1rem',
      }}
    >
      {children}
    </div>
  )
}

export { ContentBox }
