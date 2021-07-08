import React from 'react'
import { rgb2hex } from '../utils'

const ColorLabel = ({ r, g, b }) => {
  const c = rgb2hex(r, g, b)
  return (
    <div className="flex content-center">
      hex:
      <span>{c}</span>
      <div
        className="inline-block w-5 h-5 ml-1"
        style={{
          backgroundColor: c,
        }}
      ></div>
    </div>
  )
}

export default ColorLabel
