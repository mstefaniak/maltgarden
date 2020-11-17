import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'

const COOKIE_NAME = 'age-verified'
const YEAR = 365

const useAgeVerify = () => {
  const [verified, _setVerified] = useState(false)

  useEffect(() => {
    const cookieValue = Cookie.get(COOKIE_NAME)
    _setVerified(!!cookieValue)
  }, [])

  const setVerified = (): void => {
    _setVerified(true)
    Cookie.set(COOKIE_NAME, '1', { expires: YEAR })
  }

  return { verified, setVerified }
}

export { useAgeVerify }
