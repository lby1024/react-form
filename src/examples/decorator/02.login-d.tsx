import { email, formItem, label, min, password, required, rules, useForm, valueName } from "@lby/react-form"
import { Button, Checkbox, Input } from "antd"
import { FormItem } from "../compoment/FormItem"
import { msg } from "../utils"

class ConfigImpl {
  @label('邮箱')
  @formItem(<Input />)
  @rules(required(), email())
  email: string

  @label('密码')
  @formItem(<Input type="password" />)
  @rules(required(), min(6), password())
  password: string

  @formItem(<Checkbox>记住</Checkbox>)
  @valueName('checked')
  remember: boolean
}

const initialValue = {
  email: '666@qq.com',
  remember: true
}

export default () => {
  const form = useForm({
    config: ConfigImpl,
    initialValue,
    onSuccess: data => msg(data),
    onFail: err => msg(err)
  })

  const formItems = form.items.map(item => (
    <FormItem
      key={item.name}
      formItem={item.formItem}
      label={item.label}
      error={item.error}
    />
  ))

  return <>
    {formItems}
    <Button className='m-l' onClick={form.submit} >登录</Button>
  </>
}