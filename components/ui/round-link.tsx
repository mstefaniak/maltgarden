import Link from 'next/link'
import styles from './round-link.module.scss'

interface IRoundLinkProps {
  href: string
  text: string
  type?: 'filled' | 'outlined'
}

const RoundLink = ({ href, text, type = 'outlined' }: IRoundLinkProps) => {
  return (
    <Link href={href}>
      <a
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
