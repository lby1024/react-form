
export const label = (str: string) => (prototype: any, name: string) => {
  setConfig(
    prototype,
    name,
    ['label', str]
  )
}

export const rules = (...arr: any[]) => (prototype: any, name: string) => {
  setConfig(
    prototype,
    name,
    ['rules', arr]
  )
}

export const formItem = (item: any) => (prototype: any, name: string) => {
  setConfig(
    prototype,
    name,
    ['formItem', item],
  )
}

export const subForm = (item: any) => (prototype: any, name: string) => {
  setConfig(
    prototype,
    name,
    ['subForm', item],
  )
}

export const formList = (item: any) => (prototype: any, name: string) => {
  setConfig(
    prototype,
    name,
    ['formList', item]
  )
}

export const valueName = (vName: string) => (prototype: any, name: string) => {
  setConfig(
    prototype,
    name,
    ['valueName', vName]
  )
}



function setConfig(prototype: any, name: string, [key, value]: [string, any]) {
  if (!prototype.config) prototype.config = {}
  if (!prototype.config[name]) prototype.config[name] = {}
  prototype.config[name][key] = value
}
