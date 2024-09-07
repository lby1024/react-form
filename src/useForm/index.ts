import { useState } from "react";
import { UseFormProps, FormData, Err } from "../types";
import { initData } from "../tools";
import { useCheck } from "./useCheck";
import { useBind } from "./useBind";


export const useForm = (props: UseFormProps) => {
  const { config } = props
  type N = keyof typeof config // 表单属性: 'username' | 'password' | 'age'
  type F = FormData<typeof config>
  type E = Err<typeof config>
  const [data, setData] = useState<F>(initData(props))
  const [error, setError] = useState<E>({})
  const checker = useCheck(config, data)

  const onChange = async (formData: F, name: string) => {
    setData(formData)
    const err = await checker.checkItem(name)
    setError(error => ({
      ...error,
      name: err
    }))
  }

  const items = useBind({
    formData: data,
    error,
    onChange
  })


  const setForm = (formData: F) => {
    setData({
      ...data,
      ...formData
    })
    setError({})
  }

  async function submit() {
    const res = await checker.submit()

    if (res.hasError) {
      if (res.error) setError(res.error)
      props.onFail && props.onFail(res.firstError)
    } else {
      props.onSuccess && props.onSuccess(data)
    }
  }

  return {
    submit,
    setForm
  }
}