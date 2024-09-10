import { Config, min, required, useForm } from "@lby/react-form";
import { Button, Input } from "antd";
import { FullName } from "./FullName";
import { NameList } from "./nameList";
import { msg } from "../utils";
import { FormItem } from "./FormItem";
import { FC, useEffect } from "react";

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
    formList: <NameList />,
    rules: [required('最少1个学生'), min(1, '最少1个学生')]
  }
}


interface FullNameProps {
  value?: any,
  onChange?: Function,
  father?: any
}

export const ClassForm: FC<FullNameProps> = (props) => {
  const form = useForm({
    config,
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