import { useEffect } from "react"
import { Form, Obj, UseFormProps } from "./types"
import { getFirstError, getFormData, updateForm } from "./tools"
import { useBind } from "./useBind"
import { useCheck } from "./useCheck"
import { useStatePro } from "./hooks/useStatePro"

function useForm(props: UseFormProps) {
  const { config, initialValue } = props
  const [form, setForm, getForm] = useStatePro<Form>({})
  const checker = useCheck(props)

  useEffect(() => {
    const newform = updateForm({
      form,
      initialValue,
      config,
    })
    setForm(newform)
  }, [config])

  const items = useBind({
    form,
    setForm,
    checker,
    useFormProps: props
  })

  /**
   * 跟新表单错误信息
   */
  function updataFormError(errors: Obj = {}) {
    const form = getForm()

    for (let name in form) {
      form[name].error = undefined
    }

    for (let name in errors) {
      form[name].error = errors[name]
    }
    setForm({ ...form })
  }

  async function checkFormData() {
    const form = getForm()
    const formData = getFormData(form)

    const errors = await checker.checkFormData(formData)
    updataFormError(errors)
    return getFirstError(errors)
  }

  async function checkForm() {
    return await checker.checkList()
  }

  useEffect(() => {
    const unSub = checker.subscrible(checkFormData)
    return () => unSub()
  }, [])

  async function submit() {
    const err = await checker.checkList()

    if (err) {
      props.onFail && props.onFail(err)
    } else {
      const formData = getFormData(form)
      props.onSuccess && props.onSuccess(formData)
    }
  }

  async function setFormData(data: Obj) {
    if (!form) return
    if (!data) return

    for (let name in data) {
      form[name].value = data[name]
    }

    setForm({ ...form })
  }

  return {
    items,
    submit,
    checkForm,
    setFormData,
    getFormData: () => getFormData(getForm())
  }
}

export default useForm
