import { ChangeEvent, useState } from 'react'
import styles from './slider.module.scss'

interface ISliderProps {
  min?: number
  max?: number
  margin?: number
  value?: number
  onChange: (event: number) => void
}

const Slider = ({
  min = 0,
  max = 100,
  margin = 0,
  value = 50,
  onChange,
}: ISliderProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    if (newValue >= min + margin && newValue <= max - margin) {
      onChange(newValue)
    }
  }

  return (
    <input
      className={styles.slider}
      value={value}
      min={min}
      max={max}
      onChange={handleChange}
      type="range"
    />
  )
}

export { Slider }
