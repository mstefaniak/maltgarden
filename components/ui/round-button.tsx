import styles from './round-button.module.scss'

interface Props {
  onClick?: () => void
  text: string
  type?: 'filled' | 'outlined'
  hideIcon?: boolean
}

export const RoundButton = ({
  text,
  onClick = () => {},
  type = 'outlined',
  hideIcon = false,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={`
      ${styles.Button}
      ${type === 'filled' ? styles.isFilled : ''}
    `}
    >
      {text} {hideIcon ? '' : '->'}
    </button>
  )
}
