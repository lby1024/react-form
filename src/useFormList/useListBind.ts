import { cloneElement, useMemo } from "react"
import { getItem, getValue } from "../tools"
import { UseFormListProps } from "../types"
import { useListCheck } from "./useListCheck"

export const useListBind = (
  useFormListProps: UseFormListProps,
  [arr, setArr, getArr]: [any[], Function, Function],
  [errs, setErrs, getErrs]: [any[], Function, Function],
  checker: ReturnType<typeof useListCheck>,
) => {

  const { config } = useFormListProps

  const change = (index: number) => async (e: any) => {
    const list = getArr()
    list[index] = getValue(e, config.valueName)
    setArr(list)

    if (useFormListProps.onChange) {
      useFormListProps.onChange(list, index)
    }

    const rules = config.rules || []
    const err = await checker.checkItem(list[index], rules)
    const errs = getErrs()
    errs[index] = err
    setErrs([...errs])
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
    const list = arr || []

    for (let i = 0; i < list.length; i++) {
      items.push({
        name: i,
        formItem: cloneItem(i),
        label: config.label,
        error: errs[i]
      })
    }

    return items
  }, [arr, errs])
}