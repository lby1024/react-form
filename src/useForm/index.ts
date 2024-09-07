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
  const checker = useCheck(config, data)

  const onChange = async (formData: F, name: string) => {
    setData(formData)
    props.onChange && props.onChange(formData, name)
    const err = await checker.checkItem(name)
    setError(error => ({
      ...error,
      [name]: err
    }))
  }

  const items = useBind({
    formData: data,
    error,
    config,
    checker,
    onChange,
  })


  const setFormData = (formData: F) => {
    const d = {
      ...data,
      ...formData
    }
    setData(d)
    setError({})
  }


  const reset = () => {
    setData(initData(props))
    setError({})
  }

  async function submit() {
    const res = await checker.submit()

    if (res.hasError) {
      if (res.error) setError(res.error)// 有可能是子表单hasError
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
    items
  }
}
