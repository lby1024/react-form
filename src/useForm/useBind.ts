import { useMemo } from "react"
import { Obj } from "../types"

type UseBindProps = {
  formData: Obj
  error: Obj
  onChange: (formData: Obj, name: string) => void
}

export const useBind = (props: UseBindProps) => {

  const { formData, error } = props

  const items = useMemo(() => {

  }, [formData, error])

  return []
}