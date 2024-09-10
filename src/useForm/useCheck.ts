import { FormData } from './../types';
import { useEffect, useRef } from "react"
import { CheckFn, Obj, UseFormProps } from "../types"
import { isFunction } from "../tools"
import { useCurrent } from "../hooks/useCurrent"


export const useCheck = (
  useFormProps: UseFormProps,
  [formData, setData]: [Obj, Function],
  [error, setError]: [Obj, Function]
) => {
  const { config, father } = useFormProps

  const checkForm: CheckFn = useCurrent(async ({ formData }) => {
    let error: Obj = {}
    let hasError = false
    let firstError

    for (let name in formData) {
      error[name] = await checkItem(name, formData)
      if (error[name]) {
        hasError = true
        if (!firstError) firstError = error[name]
      }
    }

    setError(error)

    return {
      hasError,
      error,
      firstError
    }

  }, { formData })

  const listRef = useRef<CheckFn[]>([checkForm])
  /**
   * 根表单订阅子表单的checkForm
   */
  useEffect(() => {
    const sub = father
    if (isFunction(sub) === false) {
      return
    }
    const unSub = sub(checkForm)
    return () => unSub()
  }, [])

  const checkItem = async (name: string, formData: any) => {
    const rules = config[name].rules || []
    const err = await check(name, formData, rules)
    return err as string
  }

  async function submit() {
    let hasError = false
    let firstError
    let error

    for (let i = 0; i < listRef.current.length; i++) {
      const checkFn = listRef.current[i]
      const res = await checkFn()
      if (res.hasError) hasError = true
      if (res.hasError && !firstError) firstError = res.firstError
      if (i === 0) error = res.error
    }

    return {
      hasError,
      firstError,
      error
    }
  }


  function subscrible(checkFn: CheckFn) {
    listRef.current.push(checkFn)

    return () => {
      const index = listRef.current.indexOf(checkFn)
      listRef.current.splice(index, 1)
    }
  }

  return {
    submit,
    checkItem,
    checkForm,
    subscrible
  }
}

async function check(name: string, formData: Obj, rules: Function[]) {
  let err = undefined

  for (let rule of rules) {
    try {
      await rule(formData[name], formData)
    } catch (error) {
      err = error
      break
    }
  }

  return err
}
