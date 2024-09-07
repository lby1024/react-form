import { cloneElement, useMemo } from "react"
import { FormItem, UseBindProps } from "./types"
import { getFormData, getItem } from "./tools"


export function useBind(props: UseBindProps) {
  const { form, setForm, useFormProps, checker } = props
  const { config } = useFormProps

  /**
   * 双向绑定 action -> value
   */
  const change = (name: string) => async (e: any) => {
    const v = getFormItemValue(e, config[name].valueName) // 获取e里面的值
    form[name].value = v
    const formData = getFormData(form)
    checkFormItem(name, formData)

    if (useFormProps.onChange) {
      useFormProps.onChange(formData, name)
    } else {
      setForm({ ...form })
    }
  }

  async function checkFormItem(name: string, formData: any) {
    const err = await checker.checkItem(name, formData)

    setForm((form: any) => {
      form[name].error = err
      return { ...form }
    })
  }

  const items = useMemo(() => {

    const arr = []
    const formData = getFormData(form)

    for (let name in formData) {
      const item = {
        name,
        formItem: cloneItem(name),
        label: form[name].label,
        error: form[name].error
      }
      arr.push(item)
    }

    return arr
  }, [form])

  function cloneItem(name: string) {
    const { valueName = 'value' } = config[name]

    const props = {
      [valueName]: form[name] ? form[name].value : undefined,
      onChange: change(name),
      name,
    }
    // 如果是<input/>, 就不传入subscrible
    if (!config[name].formItem) {
      props.subscrible = checker.subscrible
    }

    const item = getItem(config[name])
    return cloneElement(item, props)
  }

  return items
}



function getFormItemValue(e: any, valueName = 'value') {
  if (!e) return e
  if (!e.target) return e
  return e.target[valueName]
}