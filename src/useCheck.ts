import { useEffect, useMemo, useRef } from "react";
import { getFirstError, initFormData } from "./tools";
import { Config, ConfigItem, Obj, UseFormProps } from "./types";
import { useFn } from "./hooks/useFn";


export function useCheck(props: UseFormProps) {

  let { config } = props
  const checkListRef = useRef<Function[]>([])



  /**
   * 输入框onchange时, 检查指定项目是否符合要求
   * 
   * 该函数用于检查给定项目是否符合指定的要求，并返回任何错误信息。
   * 
   * @param `name` - 项目名称，类型为字符串，表示要检查的项目的名称
   * @param `formData` - 表单数据对象，类型为Obj，包含要检查项目的相关数据
   * 
   * @returns 返回一个错误对象，表示检查项目时发现的任何错误信息
   */
  async function checkItem(name: string, formData: Obj) {

    let error = await checkFormItem(
      formData,
      formData[name],
      config[name]
    )

    return error
  }
  /**
   * 点击提交按钮时, 检查表单数据的有效性
   * 
   * 该函数用于检查表单数据的有效性，并返回错误信息。
   * 
   * @param {Obj} formData - 表单数据对象，包含用户提交的数据
   * 
   * @returns {Promise} - 返回一个包含错误信息的 Promise 对象
   */
  async function checkFormData111(formData: Obj) {
    console.log(config, 11111111);

    let errors = await checkForm(formData, config)
    return errors
  }

  const checkFormData = useFn(async (p) => {
    const { config, args } = p
    const formData = args[0]
    let errors = await checkForm(formData, config)
    return errors
  }, { config })

  async function checkList() {
    let err = undefined;

    for (let i = 0; i < checkListRef.current.length; i++) {
      const checkFn = checkListRef.current[i];
      const error = await checkFn();
      if (!err) {
        err = error
      }
    }

    return err;
  }

  function subscrible(checkFn: Function) {
    checkListRef.current.push(checkFn)

    return () => {
      const index = checkListRef.current.indexOf(checkFn)
      checkListRef.current.splice(index, 1)
    }
  }

  return {
    checkList,
    checkFormData,
    checkItem,
    subscrible
  }
}

async function checkFormItem(formData: any, value: any, configItem?: ConfigItem) {
  if (!configItem) return

  const { rules } = configItem
  let error = await ruleCheck(value, rules, formData)

  return error
}

async function checkForm(formData: any, config?: Config) {
  let errors: any = {}
  let hasError = false
  if (!formData) formData = initFormData(config)

  for (let name in formData) {
    const configItem = config ? config[name] : undefined
    let error = await checkFormItem(
      formData,
      formData[name],
      configItem
    )
    if (error) {
      hasError = true
      errors[name] = error
    }
  }

  return hasError ? errors : undefined
}

async function ruleCheck(value: any, rules?: Function[], formData?: any) {
  let error: any
  if (!rules) return

  for (let i = 0; i < rules.length; i++) {
    const checkFn = rules[i]

    try {
      await checkFn(value, formData)
    } catch (err) {
      error = err
      break
    }
  }

  return error
}
