import styles from './alert.module.css'

interface AlertProps {
  preview: boolean
}

const Alert = ({ preview }: AlertProps) => {
  if (!preview) {
    return null
  }

  return (
    <div className={styles.alert}>
      This is page is a preview. <a href="/api/exit-preview">Click here</a> to
      exit preview mode.
    </div>
  )
}

export { Alert }
