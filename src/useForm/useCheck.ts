import { useRef } from "react"
import { CheckFn, Config, Obj } from "../types"


export const useCheck = (config: Config, formData: Obj) => {

  const listRef = useRef<CheckFn[]>([checkForm])

  async function checkForm() {
    let error: Obj = {}
    let hasError = false
    let firstError

    for (let name in config) {
      error[name] = await checkItem(name)
      if (error[name]) {
        hasError = true
        if (!firstError) firstError = error[name]
      }
    }

    return {
      hasError,
      error,
      firstError
    }
  }

  async function checkItem(name: string) {
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
