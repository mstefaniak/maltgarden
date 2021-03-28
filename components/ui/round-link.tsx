import Link from 'next/link'
import styles from './round-link.module.scss'

interface IRoundLinkProps {
  href: string
  onClick?: () => void
  rel?: string
  text: string
  type?: 'filled' | 'outlined'
}

const RoundLink = ({
  href,
  text,
  rel,
  onClick = () => {},
  type = 'outlined',
}: IRoundLinkProps) => {
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        rel={rel}
        className={`
        ${styles.roundedLink}
        ${type === 'filled' ? styles.filled : ''}
      `}
      >
        {text} {'->'}
      </a>
    </Link>
  )
}

export { RoundLink }
