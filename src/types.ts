
export type Obj = { [key: string]: any }

export type FormItem = {
  name: string,
  label: string,
  value: any,
  error?: string,
  item: any,
  type: 'formItem' | 'subForm' | 'formList'
  show?: Function // 作用: 方便getFormData函数
}

export type Form = {
  [key: string]: FormItem
}

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
  config: Config,
  initialValue?: any,
  onSuccess?: (...arg: any) => any, // 提交成功触发
  onFail?: (...arg: any) => any,    // 提交失败触发
  onChange?: Function,  // value发生变化时触发
}

export interface UseBindProps {
  form: Form,
  setForm: Function,
  useFormProps: UseFormProps,
  checker: {
    checkItem: Function,
    checkFormData: Function,
    subscrible: Function
  }
}

export interface UseCheckProps {
  useFormProps: UseFormProps
}

export type FormListConfig = {
  formItem?: any
  subForm?: any
  formList?: any
  label?: string
  rules?: Function[]
  valueName?: string // 默认值value, CheckBox的valueName是checked
}

export interface UseForListProps {
  config: FormListConfig,
  initialValue?: any,
  onSuccess?: Function, // 提交成功触发
  onFail?: Function,    // 提交失败触发
  onChange?: Function,  // value发生变化时触发
}

