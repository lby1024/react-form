import { Config, ConfigItem, Obj, UseFormProps } from "./types"

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


/**
 *
 * 
 * 
 * 
 *  
 */
export function initData(props: UseFormProps) {
  const { config, initialValue } = props
  const res: any = {}

  for (let name in initialValue) {
    config[name].initValue = initialValue[name]
  }

  for (let name in config) {
    res[name] = config[name].initValue
  }

  return res
}