import { cloneElement, useMemo } from "react"
import { createName, getItem, getValue } from "../tools"
import { UseFormListProps } from "../types"
import { useListCheck } from "./useListCheck"

export const useListBind = (
  useFormListProps: UseFormListProps,
  [arr, setArr]: [any[], Function],
  [errs, setErrs]: [any[], Function],
  checker: ReturnType<typeof useListCheck>,
  onChange: (arr: any[], index: number) => void
) => {

  const { config } = useFormListProps

  const change = (index: number) => (e: any) => {
    arr[index] = getValue(e, config.valueName)
    onChange([...arr], index)
  }

  const cloneItem = (index: number) => {
    const { valueName = 'value' } = config

    const props = {
      [valueName]: arr[index],
      onChange: change(index),
      name,
    }
    // 如果是<input/>, 就不传入subscrible
    if (!config.formItem) {
      props.father = useFormListProps.father || checker.subscrible
    }

    const item = getItem(config)
    return cloneElement(item, props)
  }

  return useMemo(() => {
    const items = []

    for (let i = 0; i < arr.length; i++) {
      items.push({
        name: createName(),
        formItem: cloneItem(i),
        label: config.label,
        error: errs[i]
      })
    }

    return items
  }, [arr, errs])
}