import { ChangeEvent, useState } from 'react'
import styles from './slider.module.scss'

interface ISliderProps {
  min?: number
  max?: number
  defaultValue?: number
  onChange: (event: number) => void
}

const Slider = ({
  min = 0,
  max = 100,
  defaultValue = 50,
  onChange,
}: ISliderProps) => {
  const [value, setValue] = useState<number>(defaultValue)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    if (newValue >= min && newValue <= max) {
      setValue(newValue)
      onChange(newValue)
    }
  }

  return (
    <input
      className={styles.slider}
      value={value}
      onChange={handleChange}
      type="range"
    />
  )
}

export { Slider }
