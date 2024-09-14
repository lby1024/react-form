import { Config, formItem, formList, label, min, required, rules, subForm, useForm } from "@by-l/react-form";
import { Input } from "antd";
import { FullName } from "./FullName";
import { NameList } from "./nameList";
import { FormItem } from "./FormItem";
import { FC, useEffect } from "react";

type N = {
  firstName: string,
  lastName: string
}

class ConfigImpl {
  @formItem(<Input placeholder="class" />)
  @label('班级')
  @rules(required())
  className: string

  @subForm(<FullName />)
  @label('老师')
  teacher: N

  @formList(<NameList />)
  @label('学生')
  @rules(required('最少1个学生'), min(1, '最少1个学生'))
  students: N[]
}

interface FullNameProps {
  value?: any,
  onChange?: Function,
  father?: any
}

export const ClassForm: FC<FullNameProps> = (props) => {
  const form = useForm({
    config: ConfigImpl,
    onChange: props.onChange,
    father: props.father
  })

  useEffect(() => {
    form.setFormData(props.value)
  }, [props.value])

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
    </div>
  )
}