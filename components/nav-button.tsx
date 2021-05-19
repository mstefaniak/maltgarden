import { useContext } from 'react'
import cn from 'classnames'
import styles from './nav.module.scss'
import { NavContext } from '@/context/nav-context'

const NavButton = () => {
  const { isOpen, setIsOpen } = useContext(NavContext)

  const toggleOpen = () => {
    setIsOpen((open) => !open)
  }

  return (
    <div
      className={cn(styles.navButton, { [styles.isOpen]: isOpen })}
      onClick={toggleOpen}
    >
      {!isOpen && (
        <>
          <div className={cn(styles.navLine, styles.firstLine)}>
            <div className={styles.navLineBorderTop} />
            <div className={styles.navLineBorderBottom} />
          </div>
          <div className={cn(styles.navLine, styles.secondLine)}>
            <div className={styles.navLineBorderTop} />
            <div className={styles.navLineBorderBottom} />
          </div>
          <div className={cn(styles.navLine, styles.thirdLine)}>
            <div className={styles.navLineBorderTop} />
            <div className={styles.navLineBorderBottom} />
          </div>
        </>
      )}
      {isOpen && <div className={styles.close}>X</div>}
    </div>
  )
}

export { NavButton }
