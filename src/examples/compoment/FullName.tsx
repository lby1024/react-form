import { required } from "@lby/react-form/rules"
import useForm from "@lby/react-form/useForm"
import { Flex, Input } from "antd"
import { FC, useEffect } from "react"
import '../index.css'
import { Config } from "@lby/react-form/types"

export const fullNameConfig: Config = {
  firstName: {
    formItem: <Input placeholder='first name' />,
    rules: [required('firstName不能为空')]
  },
  lastName: {
    formItem: <Input placeholder='last name' />,
    rules: [required('lastName不能为空')]
  }
}

interface FullNameProps {
  value?: any,
  onChange?: Function,
  subscrible?: Function
}
export const FullName: FC<FullNameProps> = (props) => {

  const form = useForm({
    config: fullNameConfig,
    onChange: props.onChange
  })

  useEffect(() => {
    form.setFormData(props.value)
  }, [props.value])

  useEffect(() => {
    if (!props.subscrible) return
    const unSub = props.subscrible(form.checkForm)
    return () => unSub()
  }, [])

  const formItems = form.items.map(item => (
    <div className='name' data-err={item.error} key={item.name} >
      {item.formItem}
    </div>
  ))

  return <Flex gap={9}>
    {formItems}
  </Flex>
}
