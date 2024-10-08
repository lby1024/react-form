import { UseFormProps, FormData, Err, Config } from "../types";
import { initData } from "../tools";
import { useCheck } from "./useCheck";
import { useBind } from "./useBind";
import { useFormData } from "./useFormData";
import { useStatePro } from "../hooks/useStatePro";


export const useForm = <T>(props: UseFormProps) => {
  props.config = configInit(props.config)

  type N = keyof T // 表单属性: 'username' | 'password' | 'age'
  type F = FormData<T>
  type E = Err<T>

  const [data, setData, getData] = useFormData<F>(props)
  const [error, setError, getErrs] = useStatePro<E>({})

  const checker = useCheck(
    props,
    [data, setData, getData],
    [error, setError, getErrs],
  )

  const items = useBind(
    props,
    [data, setData, getData],
    [error, setError, getErrs],
    checker,
  )

  const clearError = (name?: N) => {
    if (!name) {
      setError({})
      return
    }
    setError((err: E) => {
      err[name] = undefined
      return err
    })

    return { clearError }
  }

  const setFormData = (formData: F) => {
    setData({
      ...data,
      ...formData
    })

    return { clearError }
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
    setError,
    reset,
    getFormData: data,
    items
  }
}


function configInit(config: any): Config {
  if (typeof config === 'function') {

    config.create = function () {
      if (!config.that) {
        config.that = new config()
      }
      return config.that
    }

    return config.create().config
  }

  return config
}