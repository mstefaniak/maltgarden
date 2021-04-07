import {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react'

export function useRefState<T>(
  initialValue: T
): [T, MutableRefObject<T>, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue)
  const stateRef = useRef<T>(state)
  useEffect(() => {
    stateRef.current = state as T
  }, [state])
  return [state, stateRef, setState]
}
