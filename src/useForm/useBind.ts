import { cloneElement, useMemo } from "react"
import { Obj, UseFormProps } from "../types"
import { useCheck } from "./useCheck"
import { getItem, getValue } from "../tools"


export const useBind = (
  useFormProps: UseFormProps,
  [formData, setFormData, getFormData]: [any, Function, Function],
  [error, setErrs, getErrs]: [any, Function, Function],
  checker: ReturnType<typeof useCheck>,
) => {

  const { config, father } = useFormProps

  const change = (name: string) => async (e: any) => {
    const fData = getFormData()
    fData[name] = getValue(e, config[name].valueName)
    setFormData(fData)

    if (useFormProps.onChange) {
      useFormProps.onChange(fData, name)
    }

    const err = await checker.checkItem(name, fData)
    const errs = getErrs()
    errs[name] = err
    setErrs({ ...errs })
  }

  const cloneItem = (name: string) => {
    const { valueName = 'value' } = config[name]

    const props = {
      [valueName]: formData[name],
      onChange: change(name),
      name,
      key: name
    }
    // 如果是<input/>, 就不传入subscrible
    if (!config[name].formItem) {
      props.father = father || checker.subscrible
    }

    const item = getItem(config[name])
    return cloneElement(item, props)
  }


  return useMemo(() => {
    const arr = []

    for (let name in formData) {
      arr.push({
        name,
        formItem: cloneItem(name),
        label: config[name].label,
        error: error[name]
      })
    }

    return arr
  }, [formData, error])
}
