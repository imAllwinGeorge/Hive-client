import React from 'react'
import { classNames } from '../../utils'

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = (props) => {
  return (
    <label { ...props} className={classNames("text-2xl font-bold p-4", props.className || "")}>{props.title}</label>
  )
}

export default Label