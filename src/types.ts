import { password } from './rules';
import { email, label } from '@lby/react-form';
export type Obj = { [key: string]: any }

export type ConfigItem = {
  formItem?: any
  subForm?: any
  formList?: any
  label?: string
  rules?: Function[]
  valueName?: string // 默认值value, CheckBox的valueName是checked
  show?: (formDate: any) => boolean
  initValue?: any
}

export type Config = {
  [key: string]: ConfigItem
}

export interface UseFormProps {
  config: any,
  father?: any,
  initialValue?: any,
  onSuccess?: (...arg: any) => any, // 提交成功触发
  onFail?: (...arg: any) => any,    // 提交失败触发
  onChange?: Function,  // value发生变化时触发
}
/**
 * type Data = {
 *  sex: boolen
 *  age: number
 * }
 * type Name = 'sex' | 'age'
 */
export type Name<Data> = keyof Data

export type FormData<Config> = {
  [name in Name<Config>]?: any
}
/**
 * const errs = {
 *  age: '年龄不能为空'
 *  sex: '请选择性别'
 * }
 */
export type Err<Config> = {
  [name in Name<Config>]?: string
}


type ErrorRes = {
  hasError: boolean
  firstError: string
  error: Obj
}

export type CheckFn = () => Promise<ErrorRes>

export type ListConfig = {
  formItem?: any
  subForm?: any
  formList?: any
  label?: string
  rules?: Function[]
  listRules?: Function[]
  valueName?: string // 默认值value, CheckBox的valueName是checked
  initValue?: any
}

export interface UseFormListProps {
  config: ListConfig,
  father?: any,
  initialValue?: any,
  onSuccess?: (...arg: any) => any, // 提交成功触发
  onFail?: (...arg: any) => any,    // 提交失败触发
  onChange?: Function,  // value发生变化时触发
}
