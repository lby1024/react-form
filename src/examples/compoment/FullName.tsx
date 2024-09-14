import { Flex, Input } from "antd"
import { FC, useEffect } from "react"
import { formItem, required, rules, useForm } from "@lby/react-form"
import '../index.css'

class ConfigImpl {
  @formItem(<Input placeholder='first name' />)
  @rules(required('firstName不能为空'))
  firstName: string

  @formItem(<Input placeholder='last name' />)
  @rules(required('lastName不能为空'))
  lastName: string
}

interface FullNameProps {
  value?: any,
  onChange?: Function,
  father?: any
}

export const FullName: FC<FullNameProps> = (props) => {

  const form = useForm({
    config: ConfigImpl,
    onChange: props.onChange,
    father: props.father
  })

  useEffect(() => {
    form.setFormData(props.value)
  }, [props.value])

  const formItems = form.items.map(item => (
    <div className='name' data-err={item.error} key={item.name} >
      {item.formItem}
    </div>
  ))

  return <Flex gap={9}>
    {formItems}
  </Flex>
}
