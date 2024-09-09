import { useEffect, useRef } from "react";
import { UseFormListProps } from "../types";
import { useCurrent } from "../hooks/useCurrent";
import { isFunction } from "../tools";

export const useListCheck = (
  useFormListProps: UseFormListProps,
  [arr, setArr]: [any[], Function],
  [errorList, setErrorList]: [any[], Function],
  [error, setError]: [any, Function]
) => {

  const { config } = useFormListProps
  const { rules = [], listRules } = config


  const checkForm = useCurrent(async ({ arr }) => {
    let hasError = false
    let error
    let errs

    if (listRules) {
      error = await check(arr, listRules)
      if (error) hasError = true
      setError(error as string)
    }

    if (rules) {
      errs = []
      for (let i = 0; i < arr.length; i++) {
        const err = await check(arr[i], rules)
        if (err) hasError = true
        errs[i] = err
      }
      setErrorList(errs)
    }

    return {
      hasError,
      error,
      errorList,
      firstError: getFirstError(error, errs)
    }
  }, { arr })

  const listRef = useRef<Function[]>([checkForm])

  const submit = async () => {
    let hasError = false
    let firstError

    for (let i = 0; i < listRef.current.length; i++) {
      const checkFn = listRef.current[i]
      const res = await checkFn()
      if (res.hasError) hasError = true
      if (res.hasError && !firstError) firstError = res.firstError
    }

    return {
      hasError,
      firstError,
    }
  }

  function subscrible(checkFn: Function) {
    listRef.current.push(checkFn)

    return () => {
      const index = listRef.current.indexOf(checkFn)
      listRef.current.splice(index, 1)
    }
  }

  /**
  * 根表单订阅子表单的checkForm
  */
  useEffect(() => {
    const sub = useFormListProps.father
    if (isFunction(sub) === false) {
      return
    }
    const unSub = sub(checkForm)
    return () => unSub()
  }, [])

  return {
    checkItem: check,
    checkForm,
    submit,
    subscrible
  }
}


async function check(v: any, rules: Function[]) {
  let err = undefined

  for (let rule of rules) {
    try {
      await rule(v)
    } catch (error) {
      err = error
      break
    }
  }

  return err
}

function getFirstError(err: any, errList: any) {
  if (err) return err
  for (let info of errList) {
    if (info) return info
  }
}
