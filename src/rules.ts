export const required = (msg?: string) => (v: any, formData: any) => {
  if (!v) {
    throw msg || `不能为空`
  }
}

export const max = (n: number, msg?: string) => (v: any) => {
  if (!v) return
  if (v.length > n) {
    throw msg || `长度不能大于${n}`
  }
}

export const min = (n: number, msg?: string) => (v: any) => {
  if (!v) return
  if (v.length < n) {
    throw msg || `长度不能小于${n}`
  }
}

export const nickName = (msg?: string) => (v: string) => {
  if (!v) return
  const errInfo = msg || '请填写中文或字母或数字或下划线'
  const res = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(v)
  if (res === false) throw errInfo
}

export const password = () => (v: string) => {
  if (!v) return
  const res1 = /^(?=.*\d).{1,}$/.test(v)
  if (res1 === false) throw '至少包含一个数字'
  const res2 = /^(?=.*[a-zA-Z]).{1,}$/.test(v)
  if (res2 === false) throw '至少包含一个字母'
  const res3 = /^(?=.*[@$!%*?&]).{1,}$/.test(v)
  if (res3 === false) throw '至少包含一个特殊符号@$!%*?&'
}

export const email = (msg?: string) => (v: string) => {
  if (!v) return
  const errInfo = msg || '请输入正确email地址'
  const res = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v)
  if (res === false) throw errInfo
}

export const phone = (msg?: string) => (v: string) => {
  if (!v) return
  const errInfo = msg || '请输入正确的手机号码'
  const res = /^1[3456789]\d{9}$/.test(v)
  if (res === false) throw errInfo
}

export const idCard = (msg?: string) => (v: string) => {
  if (!v) return
  const errInfo = msg || '请输入正确的身份证号码'
  const res = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(v)
  if (res === false) throw errInfo
}

// export const subForm = (config: Config) => async (formData: any) => {
//   let errors: any = {}
//   let hasError = false
//   if (!formData) formData = initFormData(config)


//   for (let name in formData) {
//     const value = formData[name]
//     const { rules } = config[name]

//     try {
//       await ruleCheck(value, rules, formData)
//     } catch (error) {
//       hasError = true
//       errors[name] = error
//     }
//   }

//   if (hasError) {
//     throw errors
//   }
// };

// export const formList = (config: FormListConfig) => async (formData: any[]) => {
//   let errorList: any = []
//   let hasError = false
//   if (!formData) formData = [undefined]

//   for (let i = 0; i < formData.length; i++) {
//     const value = formData[i]
//     const { rules } = config

//     try {
//       await ruleCheck(value, rules)
//     } catch (error) {
//       errorList[i] = error
//       hasError = true
//     }
//   }

//   if (hasError) {
//     throw errorList
//   }
// }

// async function ruleCheck(value: any, rules?: Function[], formData?: any) {
//   if (!rules) return

//   for (let i = 0; i < rules.length; i++) {
//     const checkFn = rules[i]
//     await checkFn(value, formData)
//   }
// }


