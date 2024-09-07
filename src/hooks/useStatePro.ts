import { useRef, useState } from "react"

export const useStatePro = <T>(value: T) => {
  const [v, setV] = useState<T>(value)
  const vRef = useRef<T>(value)

  const getValue = () => {
    return vRef.current
  }

  // 因为getValue能获取到最新值,所以不需要传回调函数了
  const setValue = (value: any) => {
    setV(value)
    vRef.current = isFunction(value) ? value(vRef.current) : value
  }

  return [v, setValue, getValue] as const
}

function isFunction(v: any) {
  if (typeof v === 'function') {
    return true
  }
  return false;
}
