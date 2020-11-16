import { useContext } from 'react'
import cn from 'classnames'
import styles from './nav.module.css'
import { NavContext } from '@/context/nav-context'
import { Menu } from './menu'

const Nav = () => {
  const { isOpen } = useContext(NavContext)

  return (
    <div className={cn(styles.nav, { [styles.isOpen]: isOpen })}>
      <Menu />
    </div>
  )
}

export { Nav }
