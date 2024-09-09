import { useState } from "react";
import { UseFormListProps } from "../types";
import { useListCheck } from "./useListCheck";
import { useListBind } from "./useListBind";
import { isArray } from "../tools";

export const useFormList = (props: UseFormListProps) => {
  const { config } = props
  const [arr, setArr] = useState<any[]>(arrInit(props))
  const [errList, setErrList] = useState<any[]>(errorInit(props)) // rules
  const [err, setErr] = useState('') // listRules

  const checker = useListCheck(
    props,
    [arr, setArr],
    [errList, setErrList],
    [err, setErr]
  )

  const onChange = async (arr: any[], index: number) => {
    setArr(arr)
    props.onChange && props.onChange(arr, index)
    const rules = config.rules || []
    const err = await checker.checkItem(arr[index], rules)
    errList[index] = err
    setErrList([...errList])
  }

  const items = useListBind(
    props,
    [arr, setArr],
    [errList, setErrList],
    checker,
    onChange,
  )

  const setFormList = (arr: any) => {
    setArr(arr)
    setErrList([])
    setErr('')
  }

  const reset = () => {
    setArr(arrInit(props))
    setErrList([])
    setErr('')
  }

  async function submit() {
    const res = await checker.submit()
    if (res.hasError) {
      props.onFail && props.onFail(res.firstError)
    } else {
      props.onSuccess && props.onSuccess(arr)
    }
  }

  const remove = (index: number) => {
    arr.splice(index, 1)
    errList.splice(index, 1)
    setArr([...arr])
    setErrList([...errList])
    setErr('')
    props.onChange && props.onChange(arr)
  }

  const push = (value?: any) => {
    setArr([...arr, value])
    setErrList([...errList, undefined])
    setErr('')
    props.onChange && props.onChange(arr)
  }

  const unshift = (value?: any) => {
    setArr([value, ...arr])
    setErrList([undefined, ...errList])
    setErr('')
    props.onChange && props.onChange(arr)
  }

  return {
    items,
    submit,
    reset,
    setFormList,
    push,
    unshift,
    remove,
    error: err,
    getFormData: arr,
  }


}

function arrInit(props: UseFormListProps) {
  props.config.initValue = props.initialValue || [undefined]
  return props.config.initValue
}

function errorInit(props: UseFormListProps) {
  const { initialValue } = props
  if (isArray(initialValue)) {
    return initialValue.map(item => undefined)
  }
  return [undefined]
}