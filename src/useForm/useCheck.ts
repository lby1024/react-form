import { useRef } from "react"
import { CheckFn, Config, Obj } from "../types"
import { useFn } from "../hooks/useFn"


export const useCheck = (config: Config, formData: Obj) => {

  const listRef = useRef<CheckFn[]>([checkForm])

  async function checkForm() {
    let error: Obj = {}
    let hasError = false
    let firstError

    for (let name in formData) {
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
  /**
   * useFn 解决获取不到formData最新值
   * checkItem用法: checkItem('nickName')
   */
  const checkItem = useFn(async (e) => {
    const { formData, args } = e
    const name = args[0]
    const rules = config[name].rules || []
    const err = await check(name, formData, rules)
    return err as string
  }, { formData })


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
