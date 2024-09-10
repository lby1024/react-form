import { useState } from "react";
import { UseFormListProps } from "../types";
import { useListCheck } from "./useListCheck";
import { useListBind } from "./useListBind";
import { isArray } from "../tools";
import { useCurrent } from "../hooks/useCurrent";
import { useStatePro } from "../hooks/useStatePro";

export const useFormList = (props: UseFormListProps) => {
  const { config } = props
  const [arr, setArr, getArr] = useStatePro<any[]>(arrInit(props))
  const [errList, setErrList, getErrList] = useStatePro<any[]>(errorInit(props)) // rules
  const [err, setErr] = useState('') // listRules

  const checker = useListCheck(
    props,
    [arr, setArr],
    [errList, setErrList],
    [err, setErr]
  )

  const items = useListBind(
    props,
    [arr, setArr, getArr],
    [errList, setErrList, getErrList],
    checker,
  )

  const setFormList = (arr: any) => {
    setArr(arr || [])
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

  const remove = async (index: number) => {
    arr.splice(index, 1)
    setArr([...arr])

    if (props.onChange) {
      props.onChange(arr)
    }

    errList.splice(index, 1)
    setErrList([...errList])

    const err: any = await checker.checkItem(arr, config.listRules || [])
    setErr(err)
  }

  const push = async (value?: any) => {
    const list = [...arr, value]
    setArr(list)

    if (props.onChange) {
      props.onChange(list)
    }

    setErrList([...errList, undefined])
    const err: any = await checker.checkItem(list, config.listRules || [])
    setErr(err)
  }

  const unshift = async (value?: any) => {
    const list = [value, ...arr]
    setArr(list)

    if (props.onChange) {
      props.onChange(list)
    }
    setErrList([undefined, ...errList])
    const err: any = await checker.checkItem(list, config.listRules || [])
    setErr(err)
  }

  return {
    items,
    submit,
    checkFormList: checker.checkForm,
    reset,
    setFormList,
    setErrList,
    setErr,
    push,
    unshift,
    remove,
    error: err,
    getErrList,
    getFormData: getArr,
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