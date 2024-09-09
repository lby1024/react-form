import { Config, ConfigItem, Obj, UseFormProps } from "./types"


// export function getFirstError(err: Obj): string {
//   if (!err) return ''
//   const key = Object.keys(err)[0]
//   if (typeof err[key] === 'string') {
//     return err[key]
//   }
//   return getFirstError(err[key])
// }

// export const getV = (o: any) => (...args: any[]) => {
//   args.forEach(key => {
//     if (o) {
//       o = o[key]
//     }
//   })

//   return o
// }

/**
 * 对象转数组
 */
// export function obj2Array(obj: any) {
//   if (!obj) return
//   const arr = []
//   for (let key in obj) {
//     arr.push(obj[key])
//   }

//   return arr
// }

export function getItem(configItem: ConfigItem) {
  const { subForm, formList, formItem } = configItem
  if (subForm) return subForm
  if (formList) return formList
  return formItem
}

// function getInitValue(name: string, config: Config, initialValue: Obj) {
//   if (initialValue) {
//     return initialValue[name]
//   }

//   if (config[name].initValue) {
//     return config[name].initValue
//   }
// }


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

export function getValue(e: any, valueName = 'value') {
  if (!e) return e
  if (!e.target) return e
  return e.target[valueName]
}

let i = 0
export function createName() {
  const time = new Date().getTime()
  return `${time}-${i++}`
}

export function isFunction(value: any) {
  return typeof value === 'function';
}

export function isArray(value: any) {
  return Array.isArray(value);
}