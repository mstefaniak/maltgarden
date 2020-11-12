import { useContext } from 'react'
import cn from 'classnames'
import styles from './nav.module.css'
import { NavContext } from '../context/nav-context'

const Nav = () => {
  const { isOpen } = useContext(NavContext)

  return (
    <div className={cn(styles.nav, { [styles.isOpen]: isOpen })} />
  )
}

export { Nav }
