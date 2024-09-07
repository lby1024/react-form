import { useMemo, useState } from "react"
import { UseFormProps } from "../types"
import { initData } from "../tools"

export function useFormData<F>(props: UseFormProps) {
  const { config } = props
  const [data, setData] = useState(initData(props))

  const formData = useMemo(() => {
    let filteredFormData: any = {}

    for (let name in config) {
      const show = config[name].show
      if (show && show(data) === false) {
        continue
      }
      filteredFormData[name] = data[name]
    }

    return filteredFormData as F
  }, [data])

  return [formData, setData] as const
}