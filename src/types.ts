
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
  config: Config,
  initialValue?: any,
  onSuccess?: (...arg: any) => any, // 提交成功触发
  onFail?: (...arg: any) => any,    // 提交失败触发
  onChange?: Function,  // value发生变化时触发
}
