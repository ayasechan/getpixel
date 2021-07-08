import React, { useState } from 'react'

/**
 * 从中间截断字符串
 * @param {string} s
 * @returns {string}
 */
const wrapText = (s) => {
  const maxLength = 30
  if (s.length < maxLength) {
    return s
  }
  return `${s.substr(0, parseInt(maxLength / 2))}...${s.substr(
    s.length - parseInt(maxLength / 2),
    s.length
  )}`
}

/**
 *
 * @param {Object} props
 * @param {Function} props.handleChange
 * @returns
 */
const UploadButton = ({ handleChange }) => {
  const [fileName, setFileName] = useState('未选择文件')
  return (
    <div className="my-2">
      <label
        htmlFor="uploadFile"
        className="uppercase px-2 py-1 mx-1 border border-blue-500 rounded-lg text-blue-500 "
      >
        <span>select file</span>
        <input
          className="hidden"
          onChange={(evt) => {
            const files = evt.target.files
            if (!files.length) {
              return
            }
            setFileName(files[0].name)
            if (typeof handleChange === 'function') {
              handleChange(evt)
            }
          }}
          type="file"
          name="uploadFile"
          id="uploadFile"
        />
      </label>
      <span>{wrapText(fileName)}</span>
    </div>
  )
}

export default UploadButton
