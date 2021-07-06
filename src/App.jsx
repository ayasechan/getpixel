import React from 'react'
import './App.css'
import { rgb2hex } from './utils'

const CONTROL_CODE = ['ControlLeft', 'ControlRight']
/**
 *
 * @param {object} param0
 * @returns
 */
const PointLabel = ({ x, y }) => {
  return <p>图片坐标: {`(${x}, ${y})`}</p>
}

/**
 *
 * @param {object} param0
 * @returns
 */
const ColorLabel = ({ r, g, b }) => {
  const c = rgb2hex(r, g, b)
  const size = '15px'
  return (
    <div>
      <span>
        hex: {c}{' '}
        <div
          style={{
            width: size,
            height: size,
            marginLeft: '5px',
            backgroundColor: c,
            display: 'inline-block',
          }}
        ></div>
      </span>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.isCtrlDown = false
    this.state = {
      r: 0,
      g: 0,
      b: 0,
      x: 0,
      y: 0,
    }
  }
  showImage() {
    const files = document.querySelector('input').files
    if (!files.length) {
      return
    }
    const c = document.querySelector('canvas').cloneNode()
    // 移除之前监听的事件
    document.querySelector('canvas').replaceWith(c)

    const ctx = c.getContext('2d')
    const img = new Image()
    img.src = URL.createObjectURL(files[0])
    img.onload = () => {
      c.width = img.width
      c.height = img.height
      ctx.drawImage(img, 0, 0)
    }

    c.onmousemove = (evt) => {
      // 按下 ctrl 的时候不更新坐标
      if (this.isCtrlDown) {
        return
      }
      const { x, y } = this.getMousePonint(c, evt)
      const data = ctx.getImageData(x, y, 1, 1).data
      const [r, g, b, alpha] = data
      this.setState({
        x,
        y,
        r,
        g,
        b,
      })
    }
  }

  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {MouseEvent} evt
   * @returns
   */
  getMousePonint(canvas, evt) {
    const rect = canvas.getBoundingClientRect()
    // BUG rect.top may return float 
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    }
  }

  componentDidMount() {
    this.showImage()
    document.addEventListener('keydown', (evt) => {
      if (CONTROL_CODE.includes(evt.code)) {
        this.isCtrlDown = true
      }
    })
    document.addEventListener('keyup', (evt) => {
      if (CONTROL_CODE.includes(evt.code)) {
        this.isCtrlDown = false
      }
    })
  }

  render() {
    return (
      <div>
        <canvas></canvas>

        <p>按住 ctrl 暂停更新坐标</p>
        <PointLabel x={this.state.x} y={this.state.y} />
        <ColorLabel r={this.state.r} g={this.state.g} b={this.state.b} />
        <input
          type="file"
          name="upload-image"
          id="upload-image"
          onChange={() => this.showImage()}
        />
      </div>
    )
  }
}

export default App
