import { cloneElement, useMemo } from "react"
import { Config, ConfigItem, Obj } from "../types"
import { useCheck } from "./useCheck"

type UseBindProps = {
  checker: ReturnType<typeof useCheck>
  config: Config
  formData: Obj
  error: Obj
  onChange: (formData: Obj, name: string) => void
}

export const useBind = (props: UseBindProps) => {

  const { formData, error, config, checker } = props

  const change = (name: string) => (e: any) => {
    formData[name] = getValue(e, config[name].valueName)
    props.onChange(formData, name)
  }

  const cloneItem = (name: string) => {
    const { valueName = 'value' } = config[name]

    const props = {
      [valueName]: formData[name],
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

function getItem(configItem: ConfigItem) {
  if (configItem.subForm) return configItem.subForm
  if (configItem.formList) return configItem.formList
  return configItem.formItem
}

function getValue(e: any, valueName = 'value') {
  if (!e) return e
  if (!e.target) return e
  return e.target[valueName]
}