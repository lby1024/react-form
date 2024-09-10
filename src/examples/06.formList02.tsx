import { Button, Input } from "antd";
import { Config } from "../types";
import { min, required } from "../rules";
import { FullName } from "./compoment/FullName";
import { NameListSimple } from "./compoment/nameListSimple";
import { useForm } from "../useForm";
import { msg } from "./utils";
import { FormItem } from "./compoment/FormItem";

const config: Config = {
  className: {
    label: '班级',
    formItem: <Input placeholder="class" />,
    rules: [required()]
  },
  teacher: {
    label: '老师',
    subForm: <FullName />
  },
  students: {
    label: '学生',
    formList: <NameListSimple />,
    rules: [required('最少一个学生'), min(1, '最少一个学生')]
  }
}

export default () => {
  const form = useForm({
    config,
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


  return (
    <div>
      {formItems}
      <Button className='m-l' type='primary' onClick={form.submit} >submit</Button>
    </div>
  )
}