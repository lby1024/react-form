import { FC } from "react"
import '../index.css'

interface FormItemProps {
  label?: string,
  formItem?: any,
  error?: any,
}

export const FormItem: FC<FormItemProps> = ({ label, formItem, error }) => {

  return (
    <div className='container' data-err={error} >
      <div className='label' >{label}</div>
      <div>{formItem}</div>
    </div>
  )
}