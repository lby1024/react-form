import { useRef } from "react"
import { Config, Obj } from "./types"

export const useCheck = (config: Config, formData: Obj) => {

  const listRef = useRef<Function[]>([checkForm])

  async function checkForm(data: Obj) {
    let errs = []

    for (let name in config) {
      const err = await checkItem(name)
      if (err) errs.push(err)
    }

    return errs[0]
  }

  async function checkItem(name: string) {
    const rules = config[name].rules || []
    return await check(name, formData, rules)
  }

  async function checkList() {
    const errs = []

    for (let check of listRef.current) {
      const error = await check()
      if (error) errs.push(error)
    }

    return errs[0]
  }

  return {
    checkList,
    checkItem
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
