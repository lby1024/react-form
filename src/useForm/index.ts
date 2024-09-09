import { useState } from "react";
import { UseFormProps, FormData, Err } from "../types";
import { initData } from "../tools";
import { useCheck } from "./useCheck";
import { useBind } from "./useBind";
import { useFormData } from "./useFormData";


export const useForm = (props: UseFormProps) => {
  const { config } = props
  type N = keyof typeof config // 表单属性: 'username' | 'password' | 'age'
  type F = FormData<typeof config>
  type E = Err<typeof config>
  const [data, setData] = useFormData<F>(props)
  const [error, setError] = useState<E>({})
  const checker = useCheck(
    props,
    [data, setData],
    [error, setError]
  )

  const onChange = async (formData: F, name: string) => {
    setData(formData)
    props.onChange && props.onChange(formData, name)
    const err = await checker.checkItem(name)
    setError({
      ...error,
      [name]: err
    })
  }

  const items = useBind(
    props,
    data,
    error,
    checker,
    onChange,
  )


  const setFormData = (formData: F) => {
    setData({
      ...data,
      ...formData
    })
    setError({})
  }


  const reset = () => {
    setData(initData(props))
    setError({})
  }

  async function submit() {
    const res = await checker.submit()
    if (res.hasError) {
      props.onFail && props.onFail(res.firstError)
    } else {
      props.onSuccess && props.onSuccess(data)
    }
  }

  return {
    submit,
    checkForm: checker.checkForm,
    setFormData,
    reset,
    getFormData: data,
    items
  }
}
