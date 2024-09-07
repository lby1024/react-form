import { useMemo } from "react"
import { Config, Obj } from "../types"

type UseBindProps = {
  config: Config
  formData: Obj
  error: Obj
  onChange: (formData: Obj, name: string) => void
}

export const useBind = (props: UseBindProps) => {

  const { formData, error, config } = props

  const items = useMemo(() => {

    const arr = []

    for (let name in formData) {
      const item = {
        name,
        formItem: cloneItem(name),
        label: config[name].label,
        error: error[name].error
      }
      arr.push(item)
    }

    return arr
  }, [formData, error])

  const cloneItem = (name: string) => {

  }

  return []
}