import { Input } from "antd"
import { FC, useEffect } from "react"
import { FormItem } from "./FormItem"
// import { NameList } from "./nameList"
import { Config, required, useForm } from "@lby/react-form"

export const classConfig: Config = {
  class: {
    label: '班级',
    formItem: <Input placeholder="班级名称" />,
    rules: [required()]
  },
  // names: {
  //   label: '名单',
  //   formList: <NameList />,
  // }
}


interface ClassFormProps {
  value?: any,
  onChange?: Function,
  subscrible?: Function
}

export const ClassForm: FC<ClassFormProps> = (props) => {

  const form = useForm({
    config: classConfig,
    onChange: props.onChange
  })

  useEffect(() => {
    form.setFormData(props.value)
  }, [props.value])

  useEffect(() => {
    // if (!props.subscrible) return
    // const unSub = props.subscrible(form.checkForm)
    // return () => unSub()
  }, [])

  const formItems = form.items.map(item => (
    <FormItem
      key={item.name}
      label={item.label}
      error={item.error}
      formItem={item.formItem}
    />
  ))

  return formItems
}