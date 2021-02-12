import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react'

interface NavContextData {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const navContextDefaultValue: NavContextData = {
  isOpen: false,
  setIsOpen: () => null,
}

const NavContext = createContext(navContextDefaultValue)

const NavProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(false)

  return (
    <NavContext.Provider value={{ isOpen: state, setIsOpen: setState }}>
      {children}
    </NavContext.Provider>
  )
}

export { NavContext, NavProvider }
