import { createContext, useState, Dispatch, SetStateAction } from 'react'

interface NavContextData {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const navContextDefaultValue: NavContextData = {
  isOpen: false,
  setIsOpen: () => null,
}

const NavContext = createContext(navContextDefaultValue);

const NavProvider = ({ children }) => {
  const [state, setState] = useState(false)

  return (
    <NavContext.Provider value={{isOpen: state, setIsOpen: setState}}>
      {children}
    </NavContext.Provider>
  )
}

export { NavContext, NavProvider }
