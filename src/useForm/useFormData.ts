import { useEffect, useMemo, useRef, useState } from "react"
import { UseFormProps } from "../types"
import { initData } from "../tools"

export function useFormData<F>(props: UseFormProps) {
  const { config } = props
  const [data, setData] = useState(initData(props))
  const formDataRef = useRef(data)

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

  useEffect(() => {
    formDataRef.current = formData
  }, [formData])

  function getData() {
    return formDataRef.current
  }

  return [formData, setData, getData] as const
}