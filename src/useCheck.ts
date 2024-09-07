import { useRef } from "react"
import { Config, Obj } from "./types"

export const useCheck = (config: Config, formData: Obj) => {

  const listRef = useRef<Function[]>([checkForm])

  async function checkForm(data: Obj) {
    let error: Obj = {}

    for (let name in config) {
      error[name] = await checkItem(name)

    }

    return {
      error
    }
  }

  async function checkItem(name: string) {
    const rules = config[name].rules || []
    return await check(name, formData, rules)
  }

  async function submit() {
    const list = []
    let hasError = false


    for (let check of listRef.current) {
      const error = await check()
      list.push(error)
      if (error) hasError = true
    }

    return {
      hasError,
      firstError: getFirstError(list),
      error: list[0]
    }
  }


  function subscrible(checkFn: Function) {
    listRef.current.push(checkFn)

    return () => {
      const index = listRef.current.indexOf(checkFn)
      listRef.current.splice(index, 1)
    }
  }

  return {
    submit,
    checkItem,
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

function getFirstError(arr: any[]) {
  for (let item of arr) {
    if (item) return getFirstProp(item)
  }
}

function getFirstProp(error: Obj) {
  for (let name in error) {
    return error[name]
  }
}
