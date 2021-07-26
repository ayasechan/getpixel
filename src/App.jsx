import React from 'react'
import './App.css'

import ColorLabel from './components/ColorLabel'
import UploadButton from './components/UploadButton'
const CONTROL_CODE = ['ControlLeft', 'ControlRight']

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = null
    this.ctx = null
    this.preObjURL = null
  }

  /**
   *
   * @param {MouseEvent} evt
   */
  handleMouseMove(evt) {
    if (this.props.isCtrlDown()) {
      return
    }
    if (!this.ctx) {
      return
    }
    const { x, y } = this.getMousePonint(evt)
    const data = this.ctx.getImageData(x, y, 1, 1).data
    const [r, g, b, alpha] = data
    return this.props.handleMouseMove({ x, y, r, g, b })
  }

  componentDidUpdate() {
    if (!this.props.objURL) {
      return
    }
    if (!!this.preObjURL && this.preObjURL === this.props.objURL) {
      return
    }
    this.preObjURL = this.props.objURL

    this.ctx = this.canvasRef.getContext('2d')
    const img = new Image()
    img.src = this.props.objURL
    img.onload = () => {
      this.canvasRef.width = img.width
      this.canvasRef.height = img.height
      this.ctx.drawImage(img, 0, 0)
    }
  }

  /**
   *
   * @param {MouseEvent} evt
   * @returns
   */
  getMousePonint(evt) {
    const rect = this.canvasRef.getBoundingClientRect()
    // BUG rect.top may return float
    return {
      x: evt.clientX - Math.round(rect.left),
      y: evt.clientY - Math.round(rect.top),
    }
  }
  render() {
    return (
      <canvas
        ref={(ref) => {
          this.canvasRef = ref
        }}
        onMouseMove={(evt) => this.handleMouseMove(evt)}
      ></canvas>
    )
  }
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
      objURL: null,
    }
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

  /**
   *
   * @param {Event} evt
   * @returns
   */
  showImage(evt) {
    if (!evt) {
      return
    }
    
    const files = evt.target.files
    if (!files.length) {
      return
    }

    this.setState({ objURL: URL.createObjectURL(files[0]) })
  }

  // componentDidMount() {
  //   this.showImage()
  // }

  render() {
    return (
      <div>
        <Canvas
          isCtrlDown={() => this.isCtrlDown}
          objURL={this.state.objURL}
          handleMouseMove={({ x, y, r, g, b }) =>
            this.setState({ x, y, r, g, b })
          }
        />
        <div>图片坐标: {`(${this.state.x}, ${this.state.y})`}</div>
        <ColorLabel r={this.state.r} g={this.state.g} b={this.state.b} />
        <UploadButton handleChange={(evt) => this.showImage(evt)} />

        <div>按住 ctrl 暂停更新坐标 图片太大的话使用 chrome 自带的缩放</div>
      </div>
    )
  }
}

export default App
