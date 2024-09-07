import { useEffect, useRef, useState } from "react";
import { Config, Obj, UseForListProps } from "./types";
import useForm from "./useForm";
import { createName, obj2Array } from "./tools";

type FormListItem = {
  name: string,
  initValue: any
}

function useFormList(props: UseForListProps) {
  const {
    config: configItem,
    ...useFormProps
  } = props

  const {
    initialValue = [undefined]
  } = useFormProps

  const [names, setNames] = useState<FormListItem[]>([])
  const [config, setConfig] = useState<Config>({})

  useEffect(() => {
    const initNames = initialValue.map((initValue: any) => ({
      name: createName(),
      initValue
    }))

    setNames(initNames) // 根据initialValue,生成names
  }, [])

  /**
   * 根据names, 生成config
   */
  useEffect(() => {
    let newConfig: Config = {}

    names.map(item => {
      const { name, initValue } = item
      if (config[name]) newConfig[name] = config[name]
      else newConfig[name] = { ...configItem, initValue }
    })

    setConfig(newConfig)
  }, [names])

  function onSuccess(obj: any) {
    if (props.onSuccess) {
      console.log(obj);

      const arr = obj2Array(obj)
      props.onSuccess(arr)
    }
  }

  function onChange(obj: any) {
    if (props.onChange) {
      const arr = obj2Array(obj)
      props.onChange(arr)
    }
  }

  const form = useForm({
    ...useFormProps as any,
    config,
    onSuccess,
    onChange,
  })

  function push(initValue?: any) {
    const name = createName()
    setNames([...names, { name, initValue }])

    setTimeout(() => {
      const obj = form.getFormData()
      const arr = obj2Array(obj) || []
      props.onChange && props.onChange(arr)
    }, 300)
  }

  function unshift(initValue?: any) {
    const name = createName()
    setNames([{ name, initValue }, ...names])

    setTimeout(() => {
      const obj = form.getFormData()
      const arr = obj2Array(obj) || []
      props.onChange && props.onChange(arr)
    }, 300)
  }

  function remove(i: number) {
    const res = names.filter((item, index) => index !== i)
    setNames([...res])

    setTimeout(() => {
      const obj = form.getFormData()
      const arr = obj2Array(obj) || []
      props.onChange && props.onChange(arr)
    }, 300)
  }

  function setFormData(arr: any[]) {
    const formData = form.getFormData()
    let i = 0
    for (let key in formData) {
      formData[key] = arr[i]
      i++
    }
    form.setFormData(formData)
  }



  return {
    ...form,
    push,
    unshift,
    remove,
    setFormData,
  }
}

export default useFormList

