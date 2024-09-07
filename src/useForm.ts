import { useState } from "react";
import { UseFormProps, FormData, Err } from "./types";
import { initData } from "./tools";
import { useCheck } from "./useCheck";


export const useForm = (props: UseFormProps) => {
  const { config } = props
  type N = keyof typeof config // 表单属性: 'username' | 'password' | 'age'
  type F = FormData<typeof config>
  type E = Err<typeof config>
  const [data, setData] = useState<F>(initData(props))
  const [error, setError] = useState<E>({})
  const checker = useCheck(config, data)


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
      setError(res.error)
      props.onFail && props.onFail(res.firstError)
    } else {
      props.onSuccess && props.onSuccess(data)
    }
  }


  return {
    submit
  }
}