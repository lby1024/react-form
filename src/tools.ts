import { useRef, useState } from "react"
import { Config, ConfigItem, Form, FormItem, Obj } from "./types"

export function getFormData(form: Form) {
  const data: any = {}

  for (let key in form) {
    const { name, value } = form[key]
    data[name] = value
  }
  // 动态表单,有的数据不需要显示出来
  for (let key in data) {
    const show = form[key].show || (() => true)
    if (!show(data)) {
      delete data[key]
      form[key].value = undefined
    }
  }

  return data
}

export function initFormData(config?: Config) {
  if (!config) return

  const data: any = {}

  for (let name in config) {
    data[name] = undefined
  }
  // 动态表单,有的数据不需要显示出来
  for (let name in data) {
    const show = config[name].show || (() => true)
    if (!show(data)) {
      delete data[name]
    }
  }

  return data
}



export function getFirstError(err: Obj): string {
  if (!err) return ''
  const key = Object.keys(err)[0]
  if (typeof err[key] === 'string') {
    return err[key]
  }
  return getFirstError(err[key])
}

// export const getV = (o: any) => (...args: any[]) => {
//   args.forEach(key => {
//     if (o) {
//       o = o[key]
//     }
//   })

//   return o
// }


let i = 0
export function createName() {
  const time = new Date().getTime()
  return `${time}-${i++}`
}

/**
 * 对象转数组
 */
export function obj2Array(obj: any) {
  if (!obj) return
  const arr = []
  for (let key in obj) {
    arr.push(obj[key])
  }

  return arr
}



interface updateFormProps {
  form: Form
  config: Config,
  initialValue: Obj,
}

export function updateForm(props: updateFormProps) {
  const {
    config,
    initialValue,
    form
  } = props

  const res: Form = {}

  for (let name in config) {
    if (form[name]) res[name] = form[name]
    else res[name] = createItem(name, config, initialValue)
  }

  return res
}

function createItem(name: string, config: Config, initialValue: Obj) {
  return {
    name,
    type: getType(config[name]),
    label: config[name].label || '',
    value: getInitValue(name, config, initialValue),
    error: undefined,
    item: getItem(config[name]),
    show: config[name].show
  }
}

export function getType(configItem: ConfigItem): FormItem['type'] {
  if (configItem.subForm) return 'subForm'
  if (configItem.formList) return 'formList'
  return 'formItem'
}

export function getItem(configItem: ConfigItem) {
  const { subForm, formList, formItem } = configItem
  if (subForm) return subForm
  if (formList) return formList
  return formItem
}

function getInitValue(name: string, config: Config, initialValue: Obj) {
  if (initialValue) {
    return initialValue[name]
  }

  if (config[name].initValue) {
    return config[name].initValue
  }
}
