import { Button, Input } from "antd"
import { required, min, formItem, label, rules, subForm, formList, useForm } from "@by-l/react-form"
import { FullName } from "../compoment/FullName"
import { FormItem } from "../compoment/FormItem"
import { msg } from "../utils"
import { NameList } from "../compoment/nameList"

class ConfigImpl {

  @formItem(<Input placeholder="class" />)
  @label('班级')
  @rules(required())
  className: string

  @subForm(<FullName />)
  @label('老师')
  teacher: object

  @formList(<NameList />)
  @label('学生')
  @rules(required('最少3个学生'), min(3, '最少3个学生'))
  students: string[]
}

export default () => {

  const form = useForm({
    config: ConfigImpl,
    onSuccess: data => msg(data),
    onFail: err => msg(err),
  })

  const formItems = form.items.map(item => (
    <FormItem
      key={item.name}
      label={item.label}
      formItem={item.formItem}
      error={item.error}
    />
  ))

  return <>
    {formItems}
    <Button className='m-l' type='primary' onClick={form.submit} >submit</Button>
  </>
}